import { create } from "zustand";
export type Line = { key: string; itemId: string; restaurantId: string; name: string; unit: number; qty: number; note?: string; opts: string[] };
type Cart = { lines: Line[]; open: boolean; add: (l: Omit<Line, "key">) => void; bump: (k: string, d: number) => void; toggle: (o?: boolean) => void; clear: () => void; subtotal: () => number; count: () => number };
export const useCart = create<Cart>((set, get) => ({
  lines: [], open: false,
  add: (l) => set((s) => ({ lines: [...(s.lines[0]?.restaurantId === l.restaurantId ? s.lines : []), { ...l, key: crypto.randomUUID() }], open: true })),
  bump: (k, d) => set((s) => ({ lines: s.lines.map((x) => (x.key === k ? { ...x, qty: x.qty + d } : x)).filter((x) => x.qty > 0) })),
  toggle: (o) => set((s) => ({ open: o ?? !s.open })), clear: () => set({ lines: [] }),
  subtotal: () => get().lines.reduce((a, l) => a + l.unit * l.qty, 0), count: () => get().lines.reduce((a, l) => a + l.qty, 0),
}));
export const useSearch = create<{ q: string; setQ: (q: string) => void }>((set) => ({ q: "", setQ: (q) => set({ q }) }));
