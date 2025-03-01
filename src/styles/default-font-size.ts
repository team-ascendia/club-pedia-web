import { ThemeConfig } from "tailwindcss/types/config"

const defaultFontSize: ThemeConfig["fontSize"] = {
  // Title 스타일
  title1: ["24px", { lineHeight: "34px", fontWeight: "800" }],
  title2: ["22px", { lineHeight: "30px", fontWeight: "800" }],
  title3: ["22px", { lineHeight: "30px", fontWeight: "500" }],
  title4: ["20px", { lineHeight: "26px", fontWeight: "800" }],
  title5: ["18px", { lineHeight: "24px", fontWeight: "800" }],
  title6: ["16px", { lineHeight: "22px", fontWeight: "800" }],

  // Body 스타일
  body1: ["16px", { lineHeight: "26px", fontWeight: "400" }],
  body2: ["15px", { lineHeight: "21px", fontWeight: "400" }],
  body3: ["14px", { lineHeight: "20px", fontWeight: "700" }],
  body4: ["14px", { lineHeight: "20px", fontWeight: "500" }],
  body5: ["14px", { lineHeight: "20px", fontWeight: "400" }],
  body6: ["12px", { lineHeight: "17px", fontWeight: "400" }],
}

export default defaultFontSize
