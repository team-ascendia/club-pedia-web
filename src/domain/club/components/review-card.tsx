"use client"

import dayjs from "dayjs"
import ReviewReportModal from "./review-report-modal"
import { ThumbUpIcon, VerticalThreeDotIcon } from "@/public/icons"
import Badge from "@/src/common/components/badge"
import { modalManager } from "@/src/common/module/modal-manager"
import { ReviewResponse } from "@/src/domain/club/type"

interface ReviewCardProps {
  isMine?: boolean
  tagList?: string[]
  review: ReviewResponse
}

const ReviewCard = (props: ReviewCardProps) => {
  const { isMine, tagList, review } = props
  const { id } = review

  const openReportModal = () => {
    modalManager.open({
      Component: ReviewReportModal,
      componentProps: {
        id,
      },
      id: "report-modal",
    })
  }

  return (
    <div className="flex flex-col gap-[6px] py-4 [&>*]:px-6">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <div className="rounded-1 size-6 bg-gray-500" />
            <p className="text-body3">해치</p>
            <p className="text-body6 text-[#8D8D8D]">{dayjs("2023-01-01").format("YYYY.MM.DD")}</p>
          </div>
          <div></div>
        </div>
        {isMine && <VerticalThreeDotIcon className="size-6 text-[#09244B]" />}
      </div>
      <p className="text-body6">입장료: 20,000</p>
      <div className="scrollbar-hide flex flex-row gap-[5px] overflow-x-scroll">
        <div className="size-24 shrink-0 bg-gray-100" />
        <div className="size-24 shrink-0 bg-gray-100" />
        <div className="size-24 shrink-0 bg-gray-100" />
        <div className="size-24 shrink-0 bg-gray-100" />
        <div className="size-24 shrink-0 bg-gray-100" />
        <div className="size-24 shrink-0 bg-gray-100" />
        <div className="size-24 shrink-0 bg-gray-100" />
        <div className="size-24 shrink-0 bg-gray-100" />
        <div className="size-24 shrink-0 bg-gray-100" />
        <div className="size-24 shrink-0 bg-gray-100" />
      </div>
      <p className="line-clamp-3 break-all">
        descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription descriptiondescription
        description description description descriptiondescription descriptiondescription description description
        description description description description
      </p>
      <div className="flex gap-[5px]">
        {tagList?.map(tag => (
          <Badge
            key={tag}
            color="primary"
            className="text-body6 flex w-fit shrink-0 items-center justify-center py-[5px]"
          >
            {tag}
          </Badge>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-0.5 text-gray-500">
          <ThumbUpIcon className="size-4" />
          <p className="text-body7">154</p>
        </div>
        {!isMine && (
          <button className="text-body6 text-gray-500" onClick={openReportModal}>
            신고하기
          </button>
        )}
      </div>
    </div>
  )
}

export default ReviewCard
