import Image from "next/image"
import { Logo } from "@/public/icons"
import cn from "@/src/common/util/cn"

const Footer = () => {
  return (
    <div className="w-full bg-gray-50 px-6 py-5">
      <div className="mb-3 flex justify-between">
        <Logo className={cn("w-28")} />
        <Image src="/icons/instagram.svg" alt="Instagram" width={32} height={32} />
        {/* <Instagram className={cn("w-8")} /> */}
      </div>
      <div className="text-body2 mb-[52px]">완벽한 밤을 위한 단 하나의 선택</div>
      <div className="text-body6 flex gap-x-[26px]">
        <div>이용약관</div>
        <div>개인정보처리방침</div>
      </div>
      <div className="text-body6 my-[10px]">teamascendia25@gmail.com</div>
      <div className="text-body6">ⓒ 2025. 팀아센디아 Inc. All rights reserved.</div>
    </div>
  )
}

export default Footer
