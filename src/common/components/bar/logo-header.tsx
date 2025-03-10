"use client"

import Link from "next/link"
import { Logo } from "@/public/icons"
import cn from "@/src/common/util/cn"

const LogoHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <Logo className={cn("w-28")} />
      <Link href="/club">로그인</Link>
    </div>
  )
}

export default LogoHeader
