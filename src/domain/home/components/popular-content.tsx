import Image from "next/image"
import { Comment, Heart } from "@/public/icons"
import cn from "@/src/common/util/cn"
import { SliceText } from "@/src/common/util/slice-text"
import { PostResponse } from "@/src/domain/types/home"

interface PopularContentProps {
  post: PostResponse
}

const PopularContent = (props: PopularContentProps) => {
  const { post } = props
  const { title, content, thumbnailImageUrl, member, createdAt, likeCount, commentCount, visitCount } = post
  const calculateDate = (created: string) => {
    const createdDate = new Date(created)
    const currentDate = new Date()

    const diffTime = Math.abs(currentDate.getTime() - createdDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays === 0 ? "오늘" : `${diffDays}일 전`
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString("ko-KR")
  }

  return (
    <div className="flex flex-col pt-5">
      <div className="mx-[14px]">
        <div className="flex flex-row">
          <div className="text-title5 mb-2 min-w-0 flex-1 break-words">{title}</div>
          <div className="w-20 shrink-0" />
        </div>
        <div className="mb-2 flex flex-row flex-wrap justify-between gap-x-3">
          <div className="text-body2 min-w-0 flex-1 break-words">{SliceText(content)}</div>
          {thumbnailImageUrl && (
            <Image
              src={thumbnailImageUrl}
              alt="popular_img"
              width={67}
              height={67}
              className="shrink-0 rounded-[5px]"
            />
          )}
        </div>
        <div className="text-body6 flex flex-row justify-between gap-x-16 text-gray-500">
          <div>
            {member?.nickname}&#8226;{calculateDate(createdAt)}&#8226;조회수 {formatNumber(visitCount)}
          </div>
          <div className="flex gap-x-[18px]">
            <div className="flex gap-x-[5px]">
              <Heart className={cn("size-4")} />
              {formatNumber(likeCount)}
            </div>
            <div className="flex gap-x-[5px]">
              <Comment className={cn("size-4")} />
              {formatNumber(commentCount)}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 h-px w-full bg-gray-500" />
    </div>
  )
}

export default PopularContent
