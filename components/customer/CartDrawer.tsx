"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/store/cart";
import { php } from "@/lib/utils";
export default function CartDrawer() {
  const { lines, open, toggle, bump, subtotal } = useCart();
  return (
    <AnimatePresence>{open && (<>
      <motion.div className="fixed inset-0 z-40 bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => toggle(false)} />
      <motion.aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white p-5" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.25 }}>
        <div className="flex items-center justify-between"><h2 className="text-xl font-extrabold">Your order</h2><button aria-label="Close cart" onClick={() => toggle(false)}><X /></button></div>
        <div className="mt-4 flex-1 space-y-4 overflow-y-auto">
          {lines.length === 0 && <p className="text-ink-mute">Your cart is empty. Pick something tasty from a restaurant.</p>}
          {lines.map((l) => (<div key={l.key} className="flex items-start justify-between gap-3">
            <div><p className="font-bold">{l.name}</p><p className="text-sm text-ink-mute">{l.opts.join(", ")}</p><p className="text-sm font-semibold text-brand">{php(l.unit * l.qty)}</p></div>
            <div className="flex items-center gap-2 rounded-full bg-brand-soft px-2 py-1"><button aria-label="Less" onClick={() => bump(l.key, -1)}><Minus size={16} /></button><span className="w-4 text-center font-bold">{l.qty}</span><button aria-label="More" onClick={() => bump(l.key, 1)}><Plus size={16} /></button></div>
          </div>))}
        </div>
        <Link href="/checkout" onClick={() => toggle(false)} className={`btn mt-4 text-center ${lines.length ? "" : "pointer-events-none opacity-40"}`}>Go to checkout · {php(subtotal())}</Link>
      </motion.aside></>)}
    </AnimatePresence>
  );
}
