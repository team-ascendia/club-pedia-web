import type { Config } from "tailwindcss"
import defaultColor from "./src/styles/default-color"
import defaultFontSize from "./src/styles/default-font-size"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["vaf(--font-pretendard)"],
      },
      colors: defaultColor,
      fontSize: defaultFontSize,
      borderRadius: ({ theme }: { theme: (path: string, defaultValue?: unknown) => any }) => theme("spacing"),
    },
  },
  plugins: [],
} satisfies Config
