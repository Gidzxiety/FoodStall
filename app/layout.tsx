import "./globals.css";
import { Nunito } from "next/font/google";
const f = Nunito({ subsets: ["latin"] });
export const metadata = { title: "BiteDash – food delivered fast" };
export default function Root({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={f.className}>{children}</body></html>;
}
