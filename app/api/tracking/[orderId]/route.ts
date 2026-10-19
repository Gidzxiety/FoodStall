import { NextResponse } from "next/server";
const steps = ["PLACED", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];
export async function GET(_: Request, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const created = parseInt(orderId, 36);
  const secs = Number.isFinite(created) ? Math.max(0, (Date.now() - created) / 1000) : 0; // demo: one step every 12s
  const i = Math.min(4, Math.floor(secs / 12));
  return NextResponse.json({ status: steps[i], step: i, etaSecs: Math.max(0, 48 - Math.floor(secs)), progress: Math.min(1, Math.max(0, (secs - 24) / 24)) });
}
