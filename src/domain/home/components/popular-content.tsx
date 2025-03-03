import { Comment, Heart } from "@/public/icons"
import cn from "@/src/common/util/cn"

const PopularContent = () => {
  return (
    <div className="flex flex-col pt-5">
      <div className="mx-[14px]">
        <div className="flex flex-row">
          <div className="text-title5 mb-2 min-w-0 flex-1 break-words">Title</div>
          <div className="w-20 shrink-0" />
        </div>
        <div className="mb-2 flex flex-row flex-wrap justify-between gap-x-2">
          <div className="text-body2 min-w-0 flex-1 break-words">
            contentcontentcontentcontentcontentcontentcontentcontentcontentcontent
          </div>
          <div className="size-[67px] shrink-0 rounded-[5px] bg-[#D9D9D9]" />
        </div>
        <div className="text-body6 flex flex-row justify-between gap-x-16 text-gray-500">
          <div>밥먹는 토끼&#8226;3일전&#8226;조회수 1,405</div>
          <div className="flex gap-x-[18px]">
            <div className="flex gap-x-[5px]">
              <Heart className={cn("size-4")} /> 145
            </div>
            <div className="flex gap-x-[5px]">
              <Comment className={cn("size-4")} />
              150
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 h-px w-full bg-gray-500" />
    </div>
  )
}

export default PopularContent
