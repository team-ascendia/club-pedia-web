import { ThemeConfig } from "tailwindcss/types/config"

const defaultFontSize: ThemeConfig["fontSize"] = {
  12: ["12px", { letterSpacing: "0.02em", lineHeight: "17px" }],
  14: ["14px", { letterSpacing: "0.02em", lineHeight: "20px" }],
  15: ["15px", { letterSpacing: "0.02em", lineHeight: "21px" }],
  16: ["16px", { letterSpacing: "0.02em", lineHeight: "26px" }],
  18: ["18px", { letterSpacing: "0.02em", lineHeight: "17px" }],
  "24-bold": ["24px", { letterSpacing: "0.02em", lineHeight: "34px", fontWeight: "700" }],
}

export default defaultFontSize
