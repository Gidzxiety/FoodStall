import Header from "@/components/customer/Header";
import CartDrawer from "@/components/customer/CartDrawer";
export default function L({ children }: { children: React.ReactNode }) {
  return <><Header /><main className="mx-auto max-w-6xl p-4">{children}</main><CartDrawer /></>;
}
