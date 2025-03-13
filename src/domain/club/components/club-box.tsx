"use client"

import Image from "next/image"
import Link from "next/link"
import { EventIcon } from "@/public/icons"
import Badge from "@/src/common/components/badge"
import { ClubResponse } from "@/src/domain/club/type"

interface ClubBoxProps {
  club: ClubResponse
}

const ClubBox = (props: ClubBoxProps) => {
  const { club } = props
  const { address, genres, isOpen, summary, thumbnailImageUrl, title } = club
  return (
    <Link href={`/club/${club.id}`}>
      <p className="text-title5 text-black">{title}</p>
      <div className="mt-2.5" />
      <div className="flex justify-between">
        <p className="text-body6 text-gray-500">{address}</p>
        <p className="text-body6 text-gray-500">{isOpen ? "영업 중" : "휴무 & 영업종료"}</p>
      </div>
      <div className="mt-2.5" />
      <div className="flex gap-4">
        <div className="size-[140px] shrink-0 overflow-hidden rounded bg-gray-300">
          {thumbnailImageUrl && <Image src={thumbnailImageUrl} width={140} height={140} alt="thumbnail" />}
          {!thumbnailImageUrl && (
            <div className="flex size-[140px] items-center justify-center">
              <EventIcon className="text-primary-500 size-6" />
            </div>
          )}
        </div>
        <div className="flex max-w-[calc(100%-157px)] flex-1 flex-col justify-between gap-5">
          <p className="text-body4 line-clamp-5 text-black">{summary}</p>
          <div className="scrollbar-hide flex w-full gap-[5px] overflow-x-scroll">
            {genres.map(genre => (
              <Badge
                key={genre.id}
                color="primary"
                className="text-body6 flex w-fit shrink-0 items-center justify-center"
              >
                {genre.title}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ClubBox
