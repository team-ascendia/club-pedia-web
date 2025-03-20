"use client"

import Image from "next/image"
import { HomeContentItemResponse } from "@/src/domain/types/home"

interface BoxProps {
  content: HomeContentItemResponse
  clubList: boolean
}

const HomeContentBox: React.FC<BoxProps> = ({ content, clubList }) => {
  const { thumbnailImageUrl, region, club, title } = content

  return (
    <div className="flex flex-col">
      {thumbnailImageUrl ? (
        <Image src={thumbnailImageUrl} alt="club/event_img" width={140} height={140} className="rounded-[5px]" />
      ) : (
        <div className="size-[140px] rounded-[5px] bg-gray-300" />
      )}
      <div className="text-body2 mt-[10px]">{clubList ? title : club?.title}</div>
      <div className="text-body6 text-gray-500">{region.title}</div>
    </div>
  )
}

export default HomeContentBox
