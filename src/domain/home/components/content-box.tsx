"use client"

import Image from "next/image"
import { ContentItemResponse } from "@/src/domain/types/home"

const ContentBox: React.FC<ContentItemResponse> = ({ thumbnailImageUrl, title, address }) => {
  return (
    <div className="flex flex-col">
      <Image src={thumbnailImageUrl} alt="content_img" className="size-[140px] rounded-[5px] bg-gray-300" />
      <div className="text-body2 mt-[10px]">{title}</div>
      <div className="text-body6 text-gray-500">{address}</div>
    </div>
  )
}

export default ContentBox
