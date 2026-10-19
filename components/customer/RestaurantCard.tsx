import Link from "next/link";
import { Star } from "lucide-react";
import type { Restaurant } from "@/lib/mockData";
import { php } from "@/lib/utils";
export default function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <Link href={`/restaurant/${r.id}`} className="card block overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative flex h-36 items-center justify-center bg-caramel-soft text-6xl">{r.emoji}
        {r.promo && <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">{r.promo}</span>}</div>
      <div className="p-4"><h3 className="font-extrabold">{r.name}</h3>
        <p className="text-sm text-ink-mute">{r.cuisine} · {"₱".repeat(r.price)}</p>
        <div className="mt-2 flex items-center justify-between text-sm"><span className="flex items-center gap-1 font-bold"><Star size={14} className="fill-caramel text-caramel" />{r.rating}</span>
          <span className="rounded-full bg-brand-soft px-2 py-0.5 font-semibold text-brand">{r.eta}-{r.eta + 10} min · {php(r.fee)} fee</span><span>{r.dist} km</span></div></div>
    </Link>
  );
}
