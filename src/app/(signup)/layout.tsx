import Script from "next/script"
import { PropsWithChildren } from "react"
import { SignupProvider } from "@/src/domain/signup/context/signup-context"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="px-6">
      <SignupProvider>
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="beforeInteractive" />
        {children}
      </SignupProvider>
    </div>
  )
}

export default Layout
