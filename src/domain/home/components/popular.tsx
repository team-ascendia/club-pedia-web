"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import PopularContent from "./popular-content"
import homeApi from "@/src/domain/home/api"
import { PostListResponse } from "@/src/domain/types/home"

const Popular = () => {
  const router = useRouter()

  const handleOpenAll = () => {
    router.push("/")
  }

  const {
    data: popularList,
    isPending,
    isError,
  } = useQuery<PostListResponse>({
    queryFn: () => homeApi.popularList(),
    queryKey: ["popularList"],
  })

  if (isPending) {
    return <p>로딩중</p>
  }
  if (isError) {
    return <p>에러</p>
  }

  return (
    <div className="mb-[64px] mt-[29px] px-[10px]">
      <div className="mx-[14px] mb-[10px] flex justify-between">
        <div className="text-title4">실시간 인기 글</div>
        <div onClick={handleOpenAll} className="text-body6">
          전체 보기 {">"}
        </div>
      </div>
      {popularList?.items?.slice(0, 6).map(item => <PopularContent key={item.id} post={item} />)}
    </div>
  )
}

export default Popular
