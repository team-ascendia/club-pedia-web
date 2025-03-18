"use client"

import { PropsWithChildren, useEffect, useState } from "react"

const MSWComponent: React.FC<PropsWithChildren> = ({ children }) => {
  const [mswReady, setMswReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      const initMsw = await import("./index").then(res => res.initMsw)
      await initMsw()
      setMswReady(true)
    }

    if (!mswReady) {
      init()
    }
  }, [mswReady])

  return <>{children}</>
}

export default MSWComponent
