import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: {
    brand: { DEFAULT: "#F26B0F", dark: "#D45A08", soft: "#FFF1E6" }, // main orange
    caramel: { DEFAULT: "#C68B59", soft: "#F6EBDD" },                // in-progress accent
    ink: { DEFAULT: "#2B2B2E", mute: "#6B6B70" },                    // dark gray text
    paper: "#FAF8F5", ok: "#1E9E6A" } } },
} satisfies Config;
