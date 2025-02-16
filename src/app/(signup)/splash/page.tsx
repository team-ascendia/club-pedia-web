import { Icon } from "@iconify/react"
import Header from "@/src/common/components/bar/header"

const Page = () => {
  return (
    <div>
      <Header title="회원가입" showBack />
      <div className="font-pretendard mb-80 mt-[52px] whitespace-pre-line text-[24px] font-semibold leading-normal tracking-[-0.48px]">
        회원가입을 통해{"\n"} 재밌는 클럽 소식을{"\n"} 손쉽게 얻어가세요 🎉
      </div>
      <div className="flex flex-col gap-y-5">
        <button className="flex items-center justify-center gap-x-2 rounded-xl bg-yellow-50 p-4 text-base font-medium">
          <Icon icon="raphael:bubble" />
          카카오로 시작하기
        </button>
        <button className="flex items-center justify-center gap-x-2 rounded-xl border border-gray-400 p-4 text-base font-medium">
          <Icon icon="flat-color-icons:google" />
          구글로 시작하기
        </button>
        <button className="flex items-center justify-center gap-x-2 rounded-xl bg-[#02C759] p-4 text-base font-medium text-white">
          <Icon icon="simple-icons:naver" />
          네이버로 시작하기
        </button>
      </div>
    </div>
  )
}

export default Page
