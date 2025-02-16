import { PropsWithChildren } from "react"
import { SignupProvider } from "@/src/domain/signup/context/signup-context"

const Layout = ({ children }: PropsWithChildren) => {
  return <SignupProvider>{children}</SignupProvider>
}

export default Layout
