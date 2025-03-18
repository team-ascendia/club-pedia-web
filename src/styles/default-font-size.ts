import { ThemeConfig } from "tailwindcss/types/config"

const defaultFontSize: ThemeConfig["fontSize"] = {
  // Title 스타일
  title1: ["24px", { fontWeight: "800" }],
  title2: ["22px", { fontWeight: "800" }],
  title3: ["22px", { fontWeight: "500" }],
  title4: ["20px", { fontWeight: "800" }],
  title5: ["18px", { fontWeight: "800" }],
  title6: ["16px", { fontWeight: "800" }],

  // Body 스타일
  body1: ["16px", { fontWeight: "400" }],
  body2: ["15px", { fontWeight: "400" }],
  body3: ["14px", { fontWeight: "700" }],
  body4: ["14px", { fontWeight: "500" }],
  body5: ["14px", { fontWeight: "400" }],
  body6: ["12px", { fontWeight: "400" }],
  body7: ["12px", { fontWeight: "700" }],
}

export default defaultFontSize
