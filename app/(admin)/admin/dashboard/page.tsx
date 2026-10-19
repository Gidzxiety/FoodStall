"use client";
import { useState } from "react";
import { restaurants } from "@/lib/mockData";
const feed = [{ id: "A1B2", r: "Burger Barn", s: "Out for delivery" }, { id: "C3D4", r: "Sakura Ramen", s: "Preparing" }, { id: "E5F6", r: "Brown Sugar Boba", s: "Delivered" }];
export default function Admin() {
  const [rate, setRate] = useState(Object.fromEntries(restaurants.map((r) => [r.id, r.commission])));
  const [disputed, setDisputed] = useState<string[]>([]);
  return (<main className="mx-auto max-w-4xl space-y-6 p-4"><h1 className="text-2xl font-black text-brand">Platform admin</h1>
    <section className="card p-4"><h2 className="mb-2 text-lg font-extrabold">Vendors & commission</h2>
      {restaurants.map((r) => (<div key={r.id} className="flex items-center justify-between border-b border-ink/5 py-2 last:border-0"><span className="font-semibold">{r.emoji} {r.name}</span>
        <select aria-label={`Commission for ${r.name}`} value={rate[r.id]} onChange={(e) => setRate({ ...rate, [r.id]: +e.target.value })} className="rounded-lg bg-paper p-1">{[20, 25, 30].map((n) => <option key={n} value={n}>{n}%</option>)}</select></div>))}</section>
    <section className="card p-4"><h2 className="mb-2 text-lg font-extrabold">Live orders</h2>
      {feed.map((o) => (<div key={o.id} className="flex items-center justify-between py-2"><span>#{o.id} · {o.r} · <b className="text-caramel">{o.s}</b></span>
        <button onClick={() => setDisputed([...disputed, o.id])} disabled={disputed.includes(o.id)} className="rounded-full bg-ink px-3 py-1 text-sm font-bold text-white disabled:opacity-40">{disputed.includes(o.id) ? "Dispute opened" : "Open dispute"}</button></div>))}</section></main>);
}
