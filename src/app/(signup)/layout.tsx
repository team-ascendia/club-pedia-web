import Script from "next/script"
import { PropsWithChildren } from "react"
import { SignupProvider } from "@/src/domain/signup/context/signup-context"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SignupProvider>
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="beforeInteractive" />
        {children}
      </SignupProvider>
    </>
  )
}

export default Layout
