import localFont from "next/font/local"

const appleFont = localFont({
  src: [
    {
      path: "../../public/fonts/AppleSDGothicNeo-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AppleSDGothicNeo-Medium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "../../public/fonts/AppleSDGothicNeo-Bold.woff2",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/fonts/AppleSDGothicNeo-ExtraBold.woff2",
      weight: "700",
      style: "extrabold",
    },
  ],
  display: "swap",
  variable: "--font-apple",
})

export const fontClassName = appleFont.className
