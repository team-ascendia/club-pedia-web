"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import ContentBox from "./content-box"
import NoEvent from "./no-event"
import homeApi from "@/src/domain/home/api"
import { ContainerProps, ContentListResponse } from "@/src/domain/types/home"

const ContentContainer: React.FC<ContainerProps> = ({ title, movePath }) => {
  const router = useRouter()

  const handleOpenAll = () => {
    if (movePath) {
      router.push(movePath)
    }
  }

  const isClubList = title !== "Event"

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

  // useEffect(() => {
  //   if (contentList === undefined) {
  //     console.log("⚠️ contentList가 undefined 상태임")
  //   } else if (contentList.items.length === 0) {
  //     console.log("⚠️ contentList.items가 빈 배열임")
  //   } else {
  //     console.log("✅ contentList 응답 확인:", JSON.stringify(contentList, null, 2))
  //   }
  // }, [contentList])

  if (isPending) {
    return <p>로딩중</p>
  }
  if (isError) {
    return <p>에러</p>
  }

  return (
    <div className="mt-[29px] pl-6">
      <div className="mb-5 flex justify-between">
        <div className="text-title4">{title}</div>
        <div onClick={handleOpenAll} className="text-body6 mx-6">
          전체 보기 {">"}
        </div>
      </div>

      {Array.isArray(contentList?.items) && contentList.items.length > 0 ? (
        <div className="scrollbar-hide overflow-x-auto whitespace-nowrap">
          <div className="flex w-max gap-x-5">
            {contentList.items.slice(0, 6).map(item => (
              <ContentBox key={item.id} content={item} />
            ))}
          </div>
        </div>
      ) : (
        <NoEvent />
      )}
    </div>
  )
}

export default ContentContainer
