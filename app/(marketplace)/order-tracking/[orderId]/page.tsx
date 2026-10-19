"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Bike, Check, Headset, Phone, Store, Home } from "lucide-react";
const labels = ["Placed", "Confirmed by kitchen", "Preparing", "Out for delivery", "Delivered"];
export default function Tracker() {
  const { orderId } = useParams<{ orderId: string }>(); const [t, setT] = useState({ step: 0, etaSecs: 48, progress: 0 });
  // Swap this poll for a Socket.io client (socket.on("order:update")) when a realtime server is added.
  useEffect(() => { const f = () => fetch(`/api/tracking/${orderId}`).then((r) => r.json()).then(setT); f(); const i = setInterval(f, 2000); return () => clearInterval(i); }, [orderId]);
  const mm = String(Math.floor(t.etaSecs / 60)).padStart(2, "0"), ss = String(t.etaSecs % 60).padStart(2, "0");
  return (<div className="mx-auto max-w-2xl space-y-5">
    <div className="card p-5"><p className="text-sm text-ink-mute">Order #{orderId}</p><p className="text-3xl font-black text-brand">{t.step === 4 ? "Delivered. Enjoy!" : `Arriving in ${mm}:${ss}`}</p></div>
    <ol className="card space-y-3 p-5">{labels.map((l, i) => (<li key={l} className={`flex items-center gap-3 font-semibold ${i > t.step ? "text-ink-mute" : ""}`}>
      <span className={`flex h-7 w-7 items-center justify-center rounded-full text-white ${i < t.step || t.step === 4 ? "bg-ok" : i === t.step ? "bg-caramel" : "bg-ink/20"}`}>{i < t.step || t.step === 4 ? <Check size={16} /> : i + 1}</span>{l}</li>))}</ol>
    <div className="card p-5"><div className="relative h-16 rounded-xl bg-caramel-soft"><Store className="absolute left-3 top-4 text-ink" /><Home className="absolute right-3 top-4 text-ink" />
      <motion.div className="absolute top-3 rounded-full bg-brand p-2 text-white" animate={{ left: `${8 + t.progress * 80}%` }} transition={{ duration: 2 }}><Bike size={18} /></motion.div></div></div>
    <div className="flex flex-wrap gap-2"><button className="btn flex items-center gap-2"><Phone size={16} />Contact rider</button>
      <button className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-bold text-white"><Headset size={16} />Call support</button>
      <button className="rounded-full bg-white px-5 py-2.5 font-bold ring-1 ring-ink/10">View order details</button></div></div>);
}
