"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { AlertTriangle, Clock } from "lucide-react";
import { restaurants, type Item } from "@/lib/mockData";
import { php } from "@/lib/utils";
import ItemModal from "@/components/customer/ItemModal";
export default function RestaurantPage() {
  const { id } = useParams<{ id: string }>(); const r = restaurants.find((x) => x.id === id);
  const [item, setItem] = useState<Item | null>(null);
  if (!r) return <p>Restaurant not found.</p>;
  const cats = [...new Set(r.items.map((i) => i.category))];
  return (<>
    <div className="card overflow-hidden"><div className="flex h-40 items-center justify-center bg-caramel-soft text-7xl">{r.emoji}</div>
      <div className="p-5"><h1 className="text-2xl font-black">{r.name}</h1><p className="flex items-center gap-1 text-ink-mute"><Clock size={16} />Open 9:00 AM – 10:00 PM · {r.dist} km away</p>
        {r.dist > 5 && <p className="mt-3 flex items-center gap-2 rounded-xl bg-caramel-soft p-3 font-semibold text-ink"><AlertTriangle size={18} className="text-caramel" />Your address may be outside this restaurant’s delivery radius.</p>}</div></div>
    <div className="mt-5 grid gap-6 md:grid-cols-[180px_1fr]">
      <nav className="sticky top-20 hidden h-fit space-y-1 md:block">{cats.map((c) => <a key={c} href={`#${c}`} className="block rounded-lg px-3 py-2 font-semibold hover:bg-brand-soft hover:text-brand">{c}</a>)}</nav>
      <div className="space-y-6">{cats.map((c) => (<section key={c} id={c}><h2 className="mb-2 text-lg font-extrabold">{c}</h2>
        <div className="grid gap-3 sm:grid-cols-2">{r.items.filter((i) => i.category === c).map((i) => (
          <button key={i.id} disabled={!i.available} onClick={() => setItem(i)} className="card flex items-center gap-3 p-3 text-left disabled:opacity-50">
            <span className="text-4xl">{i.emoji}</span><span className="flex-1"><b>{i.name}</b><br /><span className="text-brand">{php(i.price)}</span></span>
            {!i.available && <span className="text-xs font-bold text-ink-mute">Sold out</span>}</button>))}</div></section>))}</div></div>
    {item && <ItemModal item={item} restaurantId={r.id} onClose={() => setItem(null)} />}
  </>);
}
