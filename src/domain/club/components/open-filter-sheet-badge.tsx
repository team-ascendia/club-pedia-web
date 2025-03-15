"use client"

import { ArrowLeftIcon } from "@/public/icons"
import Badge from "@/src/common/components/badge"
import cn from "@/src/common/util/cn"

interface OpenFilterSheetBadgeProps {
  title: string
  handleClick: () => void
  active?: boolean
}

const OpenFilterSheetBadge = (props: OpenFilterSheetBadgeProps) => {
  const { title, handleClick, active } = props

  return (
    <Badge
      as={"button"}
      className="flex h-8 shrink-0 items-center gap-2.5 text-gray-500"
      outline={!active}
      outlineColor="gray"
      active={active}
      activeColor="default"
      onClick={handleClick}
    >
      <p
        className={cn("text-body4", {
          "text-primary-500": active,
        })}
      >
        {title}
      </p>
      <ArrowLeftIcon
        className={cn("size-4 -rotate-90", {
          "text-primary-500": active,
        })}
      />
    </Badge>
  )
}

export default OpenFilterSheetBadge
