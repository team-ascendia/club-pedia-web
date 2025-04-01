"use client"

import cn from "@/src/common/util/cn"

interface OotdCardProps {
  imageUrl?: string
}

const OotdCard = (props: OotdCardProps) => {
  const { imageUrl } = props
  console.log(`imageUrl`, imageUrl)
  return <div className={cn("size-[110px] bg-gray-100")}></div>
}

export default OotdCard
