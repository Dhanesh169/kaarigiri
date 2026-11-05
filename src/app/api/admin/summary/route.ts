import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
export async function GET(){const user=await getSessionUser();if(user?.role!=="ADMIN")return NextResponse.json({error:"Admin access required."},{status:403});const [products,orders,customers,revenue,pending]=await Promise.all([prisma.product.count(),prisma.order.count(),prisma.user.count({where:{role:"CUSTOMER"}}),prisma.order.aggregate({where:{status:{in:["PAID","PROCESSING","SHIPPED","DELIVERED"]}},_sum:{total:true}}),prisma.order.count({where:{status:"PENDING"}})]);return NextResponse.json({products,orders,customers,revenue:revenue._sum.total?.toString()??"0",pending});}
