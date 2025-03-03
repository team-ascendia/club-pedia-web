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

  const isClubList = title === "Event"

  const {
    data: contentList,
    isPending,
    isError,
  } = useQuery<ContentListResponse>({
    queryFn: () => (isClubList ? homeApi.clubList() : homeApi.eventList()),
    queryKey: [isClubList ? "clubList" : "eventList", isClubList],
  })

  if (isPending) {
    return <p>로딩중</p>
  }
  if (isError) {
    return <p>에러</p>
  }

  // contentList: ContentRequest[] = [
  //   { name: "Item 1", location: "Seoul" },
  //   { name: "Item 2", location: "Busan" },
  // ]

  return (
    <div className="mt-[29px] pl-6">
      <div className="mb-5 flex justify-between">
        <div className="text-title4">{title}</div>
        <div onClick={handleOpenAll} className="text-body6 mx-6">
          전체 보기 {">"}
        </div>
      </div>
      <div className="flex gap-x-5">
        {contentList.totalItems > 0 ? (
          contentList.items.map(item => (
            <ContentBox
              key={item.id}
              thumbnailImageUrl={item.thumbnailImageUrl}
              title={item.title}
              address={item.address}
            />
          ))
        ) : (
          <NoEvent />
        )}
      </div>
    </div>
  )
}

export default ContentContainer
