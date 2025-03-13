"use client"

import { useRouter } from "next/navigation"
import { ArrowLeftIcon } from "@/public/icons"
import cn from "@/src/common/util/cn"

interface HeaderWithBackButtonProps {
  title: string
  sticky?: boolean
}

const HeaderWithBackButton = (props: HeaderWithBackButtonProps) => {
  const { title, sticky } = props
  const router = useRouter()

  const handleClickBack = () => {
    router.back()
  }

  return (
    <div
      className={cn("flex h-[52px] w-full items-center justify-between px-[26px] py-1 bg-white", {
        "top-0 sticky z-[1]": sticky,
      })}
    >
      <button onClick={handleClickBack}>
        <ArrowLeftIcon className="size-6" />
      </button>
      <div className="text-title1">{title}</div>
      <div className="size-6" />
    </div>
  )
}

export default HeaderWithBackButton
