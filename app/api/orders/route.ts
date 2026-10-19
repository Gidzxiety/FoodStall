import { NextResponse } from "next/server";
// Demo only: the order id encodes its creation time, so tracking works without a database.
// Replace with prisma.order.create(...) once DATABASE_URL is set.
export async function POST(req: Request) {
  await req.json();
  return NextResponse.json({ id: Date.now().toString(36) });
}
