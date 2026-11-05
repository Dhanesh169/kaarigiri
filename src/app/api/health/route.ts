import {NextResponse} from "next/server";
export async function GET(){return NextResponse.json({status:"ok",service:"kaarigiri-storefront",databaseConfigured:Boolean(process.env.DATABASE_URL)},{headers:{"Cache-Control":"no-store"}})}
