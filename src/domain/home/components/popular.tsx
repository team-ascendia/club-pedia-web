"use client"

import { useRouter } from "next/navigation"
import PopularContent from "./popular-content"

const Popular = () => {
  const router = useRouter()

  const handleOpenAll = () => {
    router.push("/")
  }
  return (
    <div className="mb-[64px] mt-[29px] px-[10px]">
      <div className="mx-[14px] mb-[10px] flex justify-between">
        <div className="text-title4">실시간 인기 글</div>
        <div onClick={handleOpenAll} className="text-body6">
          전체 보기 {">"}
        </div>
      </div>
      <PopularContent />
      <PopularContent />
      <PopularContent />
    </div>
  )
}

export default Popular
