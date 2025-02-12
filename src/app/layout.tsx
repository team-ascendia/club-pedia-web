import { MSWComponent } from "@/mocks/mswComponent"
import "./globals.css"

import type { Metadata } from "next"
import localFont from "next/font/local"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export const pretendard = localFont({
  src: "../../public/fonts/AppleSDGothicNeo.woff2",
  display: "swap",
  weight: "400 900",
  variable: "--font-pretendard",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`md:mx-auto md:max-w-[390px] ${pretendard.variable} font-pretendard`}>
        <MSWComponent>{children}</MSWComponent>
      </body>
    </html>
  )
}
