"use client"

import { useRouter } from "next/navigation"
import { Logo, NotifyIcon, SearchIcon } from "@/public/icons"

const LogoHeader = () => {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between px-4 py-3 " style={{ height: "var(--header-height)" }}>
      <Logo className="w-28 hover:cursor-pointer" onClick={() => router.push("/")} />
      <div className="flex gap-x-4">
        <SearchIcon className="size-6 hover:cursor-pointer" />
        <NotifyIcon className="size-6 hover:cursor-pointer" />
      </div>
    </div>
  )
}

export default LogoHeader
