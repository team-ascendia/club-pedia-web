"use client"

import Image from "next/image"
import { ContentItemResponse } from "@/src/domain/types/home"

interface BoxProps {
  content: ContentItemResponse
}

const ContentBox = (props: BoxProps) => {
  const { content } = props
  const { title, thumbnailImageUrl, address } = content

  const shortAddress = (address: string) => {
    return address.split(" ")[1]
  }

  return (
    <div className="flex flex-col">
      {thumbnailImageUrl && (
        <Image src={thumbnailImageUrl} alt="club/event_img" width={140} height={140} className="rounded-[5px]" />
      )}
      <div className="text-body2 mt-[10px]">{title}</div>
      <div className="text-body6 text-gray-500">{shortAddress(address)}</div>
    </div>
  )
}

export default ContentBox
