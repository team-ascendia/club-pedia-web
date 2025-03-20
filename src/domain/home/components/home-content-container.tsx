"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import HomeContentBox from "./home-content-box"
import NoEvent from "./no-event"
import homeApi from "@/src/domain/home/api"
import { ContainerProps, ContentListResponse } from "@/src/domain/types/home"

const HomeContentContainer: React.FC<ContainerProps> = ({ children, movePath, type }) => {
  const router = useRouter()

  const handleOpenAll = () => {
    if (movePath) {
      router.push(movePath)
    }
  }

  const isClubList = type === "club"

  const {
    data: contentList,
    isPending,
    isError,
  } = useQuery<ContentListResponse>({
    queryFn: () => {
      return isClubList ? homeApi.clubList() : homeApi.eventList()
    },
    queryKey: [isClubList ? "clubList" : "eventList", isClubList],
  })

  if (isPending) {
    return <p>로딩중</p>
  }
  if (isError) {
    return <p>에러</p>
  }

  return (
    <div className="mt-[29px] pl-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="text-title4">{children}</div>
        <div onClick={handleOpenAll} className="text-body6 mr-6 text-gray-500 hover:cursor-pointer">
          전체 보기 {">"}
        </div>
      </div>

      {Array.isArray(contentList?.items) && contentList.items.length > 0 ? (
        <div className="scrollbar-hide overflow-x-auto whitespace-nowrap pr-6">
          <div className="flex w-max gap-x-5">
            {contentList.items.slice(0, 6).map(item => (
              <HomeContentBox key={item.id} content={item} clubList={isClubList} />
            ))}
          </div>
        </div>
      ) : (
        <NoEvent />
      )}
    </div>
  )
}

export default HomeContentContainer
