import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
async function main(){const email=process.env.ADMIN_EMAIL?.trim().toLowerCase();if(!email)throw new Error("Set ADMIN_EMAIL to the email address of the account you want to promote.");const user=await prisma.user.update({where:{email},data:{role:"ADMIN"},select:{email:true,role:true}});console.log("Administrator role assigned to:",user.email);}
main().catch(error=>{console.error(error);process.exitCode=1}).finally(async()=>prisma.$disconnect());
