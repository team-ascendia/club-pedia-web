"use client"

import Link from "next/link"
import { ClockIcon, LocationIcon, MapIcon } from "@/public/icons"
import OotdCard from "@/src/domain/club/components/ootd-card"
import ReviewCard from "@/src/domain/club/components/review-card"

type ClubInfoProps = {
  onClickMoreViewOOTD: () => void
  onClickMoreViewReview: () => void
}

const DUMMY_ARRAY = new Array(9).fill(0)

const ClubInfo = (props: ClubInfoProps) => {
  const { onClickMoreViewOOTD, onClickMoreViewReview } = props

  return (
    <div>
      {/* 클럽 기본 정보 */}
      <Link href={"https://naver.com"} target="_blank" rel="noopener noreferrer">
        fsadd
      </Link>
      <div className="flex flex-col gap-3 px-6 py-[22px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[5px]">
            <LocationIcon className="size-4" />
            <p className="text-body2">서울 서초구 강남대로 5597 지하 1층</p>
          </div>
          <MapIcon className="size-4" />
        </div>
        <div className="flex items-center gap-[5px]">
          <ClockIcon className="size-4" />
          <p className="text-body2">영업 중</p>
        </div>
      </div>
      <div className="h-1 bg-gray-100" />

      {/* OOTD */}
      <div className="flex flex-col gap-[15px] px-6 py-[22px]">
        <p className="text-title4">OOTD</p>
        <div className="grid w-full grid-cols-3 flex-wrap place-items-center justify-start gap-1.5">
          {DUMMY_ARRAY.map((_, index) => (
            <OotdCard key={index} />
          ))}
        </div>
        <button
          className="text-title6 rounded-2 w-full border border-gray-500 px-6 py-[14px]"
          onClick={onClickMoreViewOOTD}
        >
          더보기
        </button>
      </div>

      {/* Review */}
      <div className="flex flex-col gap-[15px] py-[22px]">
        <p className="text-title4 px-6">후기</p>
        <div className="flex flex-col [&>*]:border-b [&>*]:border-gray-300">
          <ReviewCard isMine tagList={["#tag1", "#tag2", "#tag3"]} review={{ id: 1 }} />
          <ReviewCard tagList={["#tag1", "#tag2", "#tag3"]} review={{ id: 1 }} />
        </div>
        <div className="px-6">
          <button
            className="text-title6 rounded-2 w-full border border-gray-500 px-6 py-[14px]"
            onClick={onClickMoreViewReview}
          >
            더보기
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClubInfo
