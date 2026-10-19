"use client";
import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import type { Item, Mod } from "@/lib/mockData";
import { useCart } from "@/store/cart";
import { php } from "@/lib/utils";
export default function ItemModal({ item, restaurantId, onClose }: { item: Item; restaurantId: string; onClose: () => void }) {
  const add = useCart((s) => s.add);
  const [sel, setSel] = useState<Record<string, string[]>>(() => Object.fromEntries(item.mods.map((m) => [m.id, m.required ? [m.options[0].id] : []])));
  const [qty, setQty] = useState(1); const [note, setNote] = useState("");
  const chosen = item.mods.flatMap((m) => m.options.filter((o) => sel[m.id].includes(o.id)));
  const unit = item.price + chosen.reduce((a, o) => a + o.price, 0);
  const pick = (m: Mod, id: string) => setSel((s) => ({ ...s, [m.id]: m.required ? [id] : s[m.id].includes(id) ? s[m.id].filter((x) => x !== id) : [...s[m.id], id] }));
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 sm:items-center" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 sm:rounded-3xl">
        <div className="flex justify-between"><h3 className="text-xl font-extrabold">{item.emoji} {item.name}</h3><button aria-label="Close" onClick={onClose}><X /></button></div>
        {item.mods.map((m) => (<fieldset key={m.id} className="mt-4"><legend className="font-bold">{m.name} <span className="text-xs font-semibold text-caramel">{m.required ? "Required" : "Optional"}</span></legend>
          {m.options.map((o) => (<label key={o.id} className="flex items-center justify-between py-1.5">
            <span className="flex items-center gap-2"><input type={m.required ? "radio" : "checkbox"} name={m.id} checked={sel[m.id].includes(o.id)} onChange={() => pick(m, o.id)} className="accent-[#F26B0F]" />{o.name}</span>
            {o.price > 0 && <span className="text-sm text-ink-mute">+{php(o.price)}</span>}</label>))}</fieldset>))}
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Special instructions (optional)" className="mt-4 w-full rounded-xl bg-paper p-3 outline-none" rows={2} />
        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-full bg-brand-soft px-3 py-2"><button aria-label="Less" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button><b>{qty}</b><button aria-label="More" onClick={() => setQty(qty + 1)}><Plus size={16} /></button></div>
          <button className="btn flex-1" onClick={() => { add({ itemId: item.id, restaurantId, name: item.name, unit, qty, note, opts: chosen.map((o) => o.name) }); onClose(); }}>Add to cart · {php(unit * qty)}</button>
        </div>
      </div>
    </div>
  );
}
