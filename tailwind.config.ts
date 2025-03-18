import scrollbarHide from "tailwind-scrollbar-hide"
import type { Config } from "tailwindcss"
import defaultColor from "./src/styles/default-color"
import defaultFontSize from "./src/styles/default-font-size"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        apple: ["var-(--font-apple)"],
      },
      colors: defaultColor,
      fontSize: defaultFontSize,
      borderRadius: ({ theme }: { theme: (path: string, defaultValue?: unknown) => any }) => theme("spacing"),
    },
  },
  plugins: [scrollbarHide],
} satisfies Config
