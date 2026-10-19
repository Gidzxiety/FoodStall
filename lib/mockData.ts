export type Mod = { id: string; name: string; required?: boolean; options: { id: string; name: string; price: number }[] };
export type Item = { id: string; name: string; category: string; price: number; available: boolean; emoji: string; mods: Mod[] };
export type Restaurant = { id: string; name: string; cuisine: string; emoji: string; rating: number; eta: number; fee: number; dist: number; price: number; promo?: string; commission: number; items: Item[] };
export const categories = ["Fast Food", "Milk Tea", "Japanese", "Halal", "Healthy", "Local Delicacies"];
const spice: Mod = { id: "sp", name: "Spice level", required: true, options: [{ id: "m", name: "Mild", price: 0 }, { id: "h", name: "Hot", price: 0 }] };
const extras: Mod = { id: "ex", name: "Add-ons", options: [{ id: "ch", name: "Extra cheese", price: 20 }, { id: "eg", name: "Fried egg", price: 15 }] };
export const restaurants: Restaurant[] = [
  { id: "r1", name: "Burger Barn", cuisine: "Fast Food", emoji: "🍔", rating: 4.7, eta: 15, fee: 29, dist: 1.2, price: 2, promo: "20% off selected items", commission: 25, items: [
    { id: "i1", name: "Double Cheeseburger", category: "Popular", price: 149, available: true, emoji: "🍔", mods: [extras] },
    { id: "i2", name: "Spicy Chicken Combo", category: "Combo Deals", price: 189, available: true, emoji: "🍗", mods: [spice, extras] },
    { id: "i3", name: "Iced Tea", category: "Beverages", price: 49, available: false, emoji: "🧋", mods: [] }] },
  { id: "r2", name: "Brown Sugar Boba", cuisine: "Milk Tea", emoji: "🧋", rating: 4.5, eta: 20, fee: 19, dist: 0.8, price: 1, commission: 20, items: [
    { id: "i4", name: "Caramel Milk Tea", category: "Popular", price: 99, available: true, emoji: "🧋", mods: [{ id: "sz", name: "Size", required: true, options: [{ id: "rg", name: "Regular", price: 0 }, { id: "lg", name: "Large", price: 20 }] }] }] },
  { id: "r3", name: "Sakura Ramen", cuisine: "Japanese", emoji: "🍜", rating: 4.8, eta: 30, fee: 49, dist: 6.4, price: 3, promo: "Free delivery over ₱500", commission: 30, items: [
    { id: "i5", name: "Tonkotsu Ramen", category: "Mains", price: 289, available: true, emoji: "🍜", mods: [spice, extras] }] },
];
