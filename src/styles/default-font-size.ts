import { ThemeConfig } from "tailwindcss/types/config"

const defaultFontSize: ThemeConfig["fontSize"] = {
  // Title 스타일
  title1: ["24px", { letterSpacing: "-0.02em", lineHeight: "34px", fontWeight: "800" }],
  title2: ["22px", { letterSpacing: "-0.02em", lineHeight: "30px", fontWeight: "800" }],
  title3: ["22px", { letterSpacing: "-0.02em", lineHeight: "30px", fontWeight: "500" }],
  title4: ["20px", { letterSpacing: "-0.02em", lineHeight: "26px", fontWeight: "800" }],
  title5: ["18px", { letterSpacing: "-0.02em", lineHeight: "24px", fontWeight: "800" }],
  title6: ["16px", { letterSpacing: "-0.02em", lineHeight: "22px", fontWeight: "800" }],

  // Body 스타일
  body1: ["16px", { letterSpacing: "-0.02em", lineHeight: "26px", fontWeight: "400" }],
  body2: ["15px", { letterSpacing: "-0.02em", lineHeight: "21px", fontWeight: "400" }],
  body3: ["14px", { letterSpacing: "-0.02em", lineHeight: "20px", fontWeight: "700" }],
  body4: ["14px", { letterSpacing: "-0.02em", lineHeight: "20px", fontWeight: "500" }],
  body5: ["14px", { letterSpacing: "-0.02em", lineHeight: "20px", fontWeight: "400" }],
  body6: ["12px", { letterSpacing: "-0.02em", lineHeight: "17px", fontWeight: "400" }],
}

export default defaultFontSize
