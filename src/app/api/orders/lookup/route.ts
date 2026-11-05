import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
const schema = z.object({ reference: z.string().trim().min(5).max(40), email: z.string().trim().email().max(254).transform(v => v.toLowerCase()) });
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter your order reference and email." }, { status: 400 });
  const order = await prisma.order.findFirst({ where: { reference: parsed.data.reference.toUpperCase(), email: parsed.data.email }, select: { reference: true, status: true, currency: true, total: true, createdAt: true, items: { select: { name: true, quantity: true } } } });
  if (!order) return NextResponse.json({ error: "We couldn't find an order matching those details." }, { status: 404 });
  return NextResponse.json({ order });
}
