import { NextResponse } from "next/server";
import { products } from "@/lib/products";
export async function GET(){return NextResponse.json({products,currency:["PKR","USD"]},{headers:{"Cache-Control":"public, s-maxage=60, stale-while-revalidate=300"}})}
