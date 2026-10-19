"use client";
import { useState } from "react";
import { restaurants } from "@/lib/mockData";
import { php } from "@/lib/utils";
type O = { id: number; items: string; total: number; col: "pending" | "kitchen" | "ready"; prep: number };
const cols = { pending: "Pending acceptance", kitchen: "In kitchen", ready: "Ready for rider" } as const;
export default function Merchant() {
  const [orders, setOrders] = useState<O[]>([{ id: 101, items: "2× Double Cheeseburger", total: 328, col: "pending", prep: 15 }]);
  const [stock, setStock] = useState(Object.fromEntries(restaurants[0].items.map((i) => [i.id, i.available])));
  const [alert, setAlert] = useState(false);
  const patch = (id: number, p: Partial<O>) => setOrders((o) => o.map((x) => (x.id === id ? { ...x, ...p } : x)));
  const incoming = () => { const a = new AudioContext(), o = a.createOscillator(); o.connect(a.destination); o.frequency.value = 880; o.start(); o.stop(a.currentTime + 0.3);
    setOrders((o) => [...o, { id: 100 + o.length + 1, items: "1× Spicy Chicken Combo", total: 189, col: "pending", prep: 15 }]); setAlert(true); setTimeout(() => setAlert(false), 3000); };
  return (<main className="mx-auto max-w-6xl space-y-5 p-4">
    <div className="flex items-center justify-between"><h1 className="text-2xl font-black text-brand">Kitchen terminal</h1><button onClick={incoming} className="btn">Simulate incoming order</button></div>
    {alert && <p className="animate-pulse rounded-xl bg-brand p-3 font-bold text-white">New order received!</p>}
    <div className="grid gap-3 sm:grid-cols-4">{[["Daily sales", php(4820)], ["Active orders", String(orders.length)], ["Avg prep time", "14 min"], ["Rating", "4.7 ★"]].map(([k, v]) => <div key={k} className="card p-4"><p className="text-sm text-ink-mute">{k}</p><p className="text-2xl font-black">{v}</p></div>)}</div>
    <div className="grid gap-4 md:grid-cols-3">{(Object.keys(cols) as (keyof typeof cols)[]).map((c) => (<section key={c} className="rounded-2xl bg-caramel-soft p-3"><h2 className="mb-2 font-extrabold">{cols[c]}</h2>
      {orders.filter((o) => o.col === c).map((o) => (<div key={o.id} className="card mb-2 space-y-2 p-3"><p className="font-bold">#{o.id} · {o.items}</p><p className="text-sm text-ink-mute">{php(o.total)} · prep {o.prep} min</p>
        <div className="flex flex-wrap gap-1 text-sm font-bold">
          {c === "pending" && <><button className="rounded-full bg-brand px-3 py-1 text-white" onClick={() => patch(o.id, { col: "kitchen" })}>Accept</button>
            <button className="rounded-full bg-paper px-3 py-1" onClick={() => patch(o.id, { prep: o.prep + 10 })}>+10m</button><button className="rounded-full bg-paper px-3 py-1" onClick={() => patch(o.id, { prep: o.prep + 20 })}>+20m</button>
            <button className="rounded-full bg-ink px-3 py-1 text-white" onClick={() => { const r = prompt("Reason for rejecting?"); if (r) setOrders((x) => x.filter((y) => y.id !== o.id)); }}>Reject</button></>}
          {c === "kitchen" && <button className="rounded-full bg-ok px-3 py-1 text-white" onClick={() => patch(o.id, { col: "ready" })}>Mark ready</button>}</div></div>))}</section>))}</div>
    <section className="card p-4"><h2 className="mb-2 text-lg font-extrabold">Menu availability</h2>
      {restaurants[0].items.map((i) => (<label key={i.id} className="flex items-center justify-between py-2"><span>{i.name}</span>
        <button role="switch" aria-checked={stock[i.id]} onClick={() => setStock((s) => ({ ...s, [i.id]: !s[i.id] }))} className={`rounded-full px-4 py-1 text-sm font-bold ${stock[i.id] ? "bg-ok text-white" : "bg-ink/15"}`}>{stock[i.id] ? "In stock" : "Sold out"}</button></label>))}</section></main>);
}
