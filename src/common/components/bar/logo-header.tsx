"use client"

import { LogoIcon } from "@/public/icons"
import cn from "@/src/common/util/cn"

const LogoHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <LogoIcon className={cn("w-28")} />
    </div>
  )
}

export default LogoHeader
