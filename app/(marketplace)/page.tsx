"use client";
import { useEffect, useState } from "react";
import { categories, restaurants } from "@/lib/mockData";
import { useSearch } from "@/store/cart";
import RestaurantCard from "@/components/customer/RestaurantCard";
const promos = [{ t: "20% off your first order", c: "Use code ORANGE20" }, { t: "Free delivery over ₱500", c: "Today only" }, { t: "10% off for new users", c: "Use code WELCOME10" }];
const sorts = { top: "Top rated", fast: "Fastest delivery", dist: "Distance" } as const;
export default function Home() {
  const q = useSearch((s) => s.q).toLowerCase();
  const [cat, setCat] = useState<string | null>(null), [sort, setSort] = useState<keyof typeof sorts>("top"), [maxP, setMaxP] = useState(3), [s, setS] = useState(0);
  useEffect(() => { const t = setInterval(() => setS((x) => (x + 1) % promos.length), 4000); return () => clearInterval(t); }, []);
  const list = restaurants
    .filter((r) => (!cat || r.cuisine === cat) && r.price <= maxP && (!q || [r.name, r.cuisine, ...r.items.map((i) => i.name)].some((x) => x.toLowerCase().includes(q))))
    .sort((a, b) => (sort === "top" ? b.rating - a.rating : sort === "fast" ? a.eta - b.eta : a.dist - b.dist));
  return (<>
    <section className="rounded-3xl bg-brand p-8 text-white"><p className="text-3xl font-black">{promos[s].t}</p><p className="mt-1 font-semibold text-white/85">{promos[s].c}</p></section>
    <div className="mt-5 flex gap-2 overflow-x-auto pb-1">{categories.map((c) => (
      <button key={c} onClick={() => setCat(cat === c ? null : c)} className={`shrink-0 rounded-full px-4 py-2 font-semibold ring-1 ring-ink/10 ${cat === c ? "bg-ink text-white" : "bg-white"}`}>{c}</button>))}</div>
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {(Object.keys(sorts) as (keyof typeof sorts)[]).map((k) => (<button key={k} onClick={() => setSort(k)} className={`rounded-full px-3 py-1.5 text-sm font-semibold ${sort === k ? "bg-brand text-white" : "bg-white ring-1 ring-ink/10"}`}>{sorts[k]}</button>))}
      <label className="ml-auto text-sm">Price up to <select value={maxP} onChange={(e) => setMaxP(+e.target.value)} className="rounded-lg bg-white p-1 ring-1 ring-ink/10">{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{"₱".repeat(n)}</option>)}</select></label></div>
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((r) => <RestaurantCard key={r.id} r={r} />)}</div>
    {!list.length && <p className="mt-8 text-ink-mute">No matches. Try a different cuisine or clear the search.</p>}
  </>);
}
