"use client"

import { Logo, Notify, Search } from "@/public/icons"
import cn from "@/src/common/util/cn"

const LogoHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <Logo className={cn("w-28")} />
      <div className="flex gap-x-4">
        <Search className={cn("size-6")} />
        <Notify className={cn("size-6")} />
      </div>
    </div>
  )
}

export default LogoHeader
