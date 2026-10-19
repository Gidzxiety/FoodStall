"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import { php, VOUCHERS } from "@/lib/utils";
const pays = ["Cash on Delivery", "GCash", "PayMaya", "GrabPay", "Credit/Debit Card"];
export default function Checkout() {
  const { lines, subtotal, clear } = useCart(); const router = useRouter();
  const [addr, setAddr] = useState(""), [code, setCode] = useState(""), [off, setOff] = useState(0), [msg, setMsg] = useState(""), [tip, setTip] = useState(0), [pay, setPay] = useState(pays[0]);
  const sub = subtotal(), fee = 29, service = Math.round(sub * 0.05), total = sub - sub * off + fee + service + tip;
  const apply = () => { const v = VOUCHERS[code.trim().toUpperCase()]; setOff(v ?? 0); setMsg(v ? `Voucher applied: ${v * 100}% off` : "That code isn’t valid."); };
  const place = async () => { const res = await fetch("/api/orders", { method: "POST", body: JSON.stringify({ lines, total, pay, addr }) }); const { id } = await res.json(); clear(); router.push(`/order-tracking/${id}`); };
  if (!lines.length) return <p>Your cart is empty.</p>;
  return (<div className="grid gap-5 md:grid-cols-2">
    <div className="card space-y-4 p-5"><h2 className="text-xl font-extrabold">Delivery & payment</h2>
      <input value={addr} onChange={(e) => setAddr(e.target.value)} placeholder="Delivery address (or drop a map pin)" className="w-full rounded-xl bg-paper p-3 outline-none" />
      <div className="flex h-24 items-center justify-center rounded-xl bg-caramel-soft text-sm text-ink-mute">Map pin picker placeholder (Leaflet)</div>
      <div className="space-y-1">{pays.map((p) => <label key={p} className="flex gap-2"><input type="radio" checked={pay === p} onChange={() => setPay(p)} className="accent-[#F26B0F]" />{p}</label>)}</div></div>
    <div className="card space-y-2 p-5"><h2 className="text-xl font-extrabold">Order summary</h2>
      {lines.map((l) => <div key={l.key} className="flex justify-between"><span>{l.qty}× {l.name}</span><span>{php(l.unit * l.qty)}</span></div>)}
      <hr className="border-ink/10" />
      <div className="flex gap-2"><input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Voucher code" className="flex-1 rounded-xl bg-paper p-2 outline-none" /><button onClick={apply} className="rounded-xl bg-ink px-4 font-bold text-white">Apply</button></div>
      {msg && <p className={`text-sm font-semibold ${off ? "text-ok" : "text-brand"}`}>{msg}</p>}
      <div className="flex gap-2">{[0, 20, 50].map((t) => <button key={t} onClick={() => setTip(t)} className={`rounded-full px-3 py-1 text-sm font-semibold ${tip === t ? "bg-brand text-white" : "bg-paper"}`}>{t ? `Tip ${php(t)}` : "No tip"}</button>)}</div>
      <div className="flex justify-between text-ink-mute"><span>Delivery fee</span><span>{php(fee)}</span></div>
      <div className="flex justify-between text-ink-mute"><span>Platform service fee</span><span>{php(service)}</span></div>
      <div className="flex justify-between text-lg font-black"><span>Total</span><span>{php(total)}</span></div>
      <button className="btn w-full" disabled={!addr.trim()} onClick={place}>Place order</button></div></div>);
}
