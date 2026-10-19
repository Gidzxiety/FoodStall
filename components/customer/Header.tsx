"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LocateFixed, Search, ShoppingBag } from "lucide-react";
import { useCart, useSearch } from "@/store/cart";
import { php } from "@/lib/utils";
export default function Header() {
  const { toggle, subtotal, count } = useCart(); const { q, setQ } = useSearch();
  const [addr, setAddr] = useState("Home"); const [n, setN] = useState(0), [sub, setSub] = useState(0);
  useEffect(() => { setN(count()); setSub(subtotal()); }, [count, subtotal, useCart((s) => s.lines)]);
  return (
    <header className="sticky top-0 z-30 border-b border-ink/5 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 p-3">
        <Link href="/" className="text-2xl font-black text-brand">BiteDash</Link>
        <div className="hidden items-center gap-1 rounded-full bg-paper px-3 py-2 text-sm md:flex">
          <select aria-label="Saved addresses" value={addr} onChange={(e) => setAddr(e.target.value)} className="bg-transparent font-semibold outline-none"><option>Home</option><option>Work</option></select>
          <button aria-label="Detect my location" onClick={() => navigator.geolocation?.getCurrentPosition(() => setAddr("Current location"))}><LocateFixed size={16} className="text-brand" /></button>
        </div>
        <label className="flex flex-1 items-center gap-2 rounded-full bg-paper px-4 py-2"><Search size={18} className="text-ink-mute" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search restaurants, cuisines, dishes" className="w-full bg-transparent outline-none" /></label>
        <button onClick={() => toggle(true)} className="btn flex items-center gap-2"><ShoppingBag size={18} /><span>{n}</span><span className="hidden sm:inline">· {php(sub)}</span></button>
      </div>
    </header>
  );
}
