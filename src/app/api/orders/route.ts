import { NextResponse } from "next/server";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

const schema = z.object({
 customerName:z.string().trim().min(2).max(100), email:z.string().trim().email().max(254).transform(v=>v.toLowerCase()), currency:z.enum(["PKR","USD"]),
 address:z.object({line1:z.string().trim().min(4).max(180),line2:z.string().trim().max(180).optional(),city:z.string().trim().min(2).max(80),region:z.string().trim().max(80).optional(),postalCode:z.string().trim().max(20).optional(),country:z.string().trim().min(2).max(80),phone:z.string().trim().min(7).max(25)}),
 items:z.array(z.object({slug:z.string().min(1).max(100),quantity:z.number().int().min(1).max(20)})).min(1).max(30)
});
export async function GET(){
 const user=await getSessionUser();
 if(!user)return NextResponse.json({error:"Please sign in to view your orders."},{status:401});
 const orders=await prisma.order.findMany({where:{userId:user.id},orderBy:{createdAt:"desc"},take:50,select:{reference:true,status:true,currency:true,total:true,createdAt:true,items:{select:{name:true,quantity:true}}}});
 return NextResponse.json({orders});
}
export async function POST(request:Request){
 const parsed=schema.safeParse(await request.json().catch(()=>null));
 if(!parsed.success)return NextResponse.json({error:"Please check your contact, delivery and cart details."},{status:400});
 const user=await getSessionUser();
 try{
  const order=await prisma.$transaction(async tx=>{
   const slugs=[...new Set(parsed.data.items.map(i=>i.slug))];
   const dbProducts=await tx.product.findMany({where:{slug:{in:slugs},active:true}});
   if(dbProducts.length!==slugs.length)throw new Error("PRODUCT_UNAVAILABLE");
   const bySlug=new Map(dbProducts.map(p=>[p.slug,p]));
   const lines=parsed.data.items.map(item=>{const product=bySlug.get(item.slug)!;if(product.stock<item.quantity)throw new Error("INSUFFICIENT_STOCK");const price=parsed.data.currency==="PKR"?product.pricePKR:Number(product.priceUSD);return {product,quantity:item.quantity,price};});
   const subtotal=lines.reduce((sum,line)=>sum+line.price*line.quantity,0);
   const isPakistan=parsed.data.address.country.toLowerCase()==="pakistan";
   const shipping=parsed.data.currency==="PKR"?(isPakistan?350:2500):(isPakistan?5:15);
   for(const line of lines){const changed=await tx.product.updateMany({where:{id:line.product.id,stock:{gte:line.quantity}},data:{stock:{decrement:line.quantity}}});if(changed.count!==1)throw new Error("INSUFFICIENT_STOCK");}
   const reference="KA-"+randomUUID().replace(/-/g,"").slice(0,10).toUpperCase();
   return tx.order.create({data:{reference,userId:user?.id,email:parsed.data.email,customerName:parsed.data.customerName,currency:parsed.data.currency,subtotal,shipping,total:subtotal+shipping,address:parsed.data.address,items:{create:lines.map(line=>({productId:line.product.id,name:line.product.name,quantity:line.quantity,unitPrice:line.price}))},payment:{create:{provider:"MANUAL_PENDING",amount:subtotal+shipping,currency:parsed.data.currency,status:"PENDING"}}},select:{reference:true,currency:true,subtotal:true,shipping:true,total:true,status:true,createdAt:true}});
  },{isolationLevel:"Serializable"});
  return NextResponse.json({order,payment:{status:"PENDING",message:"Your order is recorded but payment has not been collected. Our team will contact you to confirm payment."}},{status:201});
 }catch(error){const reason=error instanceof Error?error.message:"";if(reason==="PRODUCT_UNAVAILABLE")return NextResponse.json({error:"One or more products are unavailable. Refresh your bag and try again."},{status:409});if(reason==="INSUFFICIENT_STOCK")return NextResponse.json({error:"There is not enough stock for one or more items."},{status:409});return NextResponse.json({error:"Order creation is unavailable. Check that the database is configured and migrated."},{status:503});}
}
