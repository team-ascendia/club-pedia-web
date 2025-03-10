"use client"

import Image from "next/image"
import Link from "next/link"
import { EventIcon } from "@/public/icons"
import Badge from "@/src/common/components/badge"
import { formatDateRange } from "@/src/common/util/format"
import { EventResponse } from "@/src/domain/club/[event]/type"

interface EventBoxProps {
  event: EventResponse
}

const EventBox = (props: EventBoxProps) => {
  const { event } = props
  const { club, endDate, genres, title, startDate, summary, thumbnailImageUrl } = event
  return (
    <Link href={`/event/${event.id}`}>
      <p className="text-title5 text-black">{title}</p>
      <div className="mt-2.5" />
      <div className="flex justify-between">
        <p className="text-body6 text-gray-500">{club.title}</p>
        <p className="text-body6 text-gray-500">{formatDateRange(startDate, endDate)}</p>
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

export default EventBox
