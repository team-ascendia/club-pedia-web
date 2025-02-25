"use client"

import { Icon } from "@iconify/react"
import Header from "@/src/common/components/bar/header"
import handleGoogleLogin from "@/src/domain/oauth/google"
import Kakao from "@/src/domain/oauth/kakao"
import handleNaverLogin from "@/src/domain/oauth/naver"

const Page = () => {
  const handleKakaoLogin = () => {
    Kakao({ redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL })
  }

  return (
    <div>
      <Header title="회원가입" showClose />
      <div className="text-title1 mb-80 mt-[52px] whitespace-pre-line leading-normal tracking-[-0.48px]">
        클럽의 모든 정보를 한 눈에!{"\n"}쉽고 빠르게 가입하고{"\n"}원하는 클럽을 찾아보세요 🎉
      </div>
      <div className="flex flex-col gap-y-5">
        <button
          onClick={handleKakaoLogin}
          className="flex items-center justify-center gap-x-2 rounded-[10px] bg-yellow-50 p-4 text-base font-medium"
        >
          <Icon icon="raphael:bubble" />
          카카오로 시작하기
        </button>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-x-2 rounded-[10px] border border-gray-400 p-4 text-base font-medium"
        >
          <Icon icon="flat-color-icons:google" />
          구글로 시작하기
        </button>
        <button
          onClick={handleNaverLogin}
          className="flex items-center justify-center gap-x-2 rounded-[10px] bg-[#02C759] p-4 text-base font-medium text-white"
        >
          <Icon icon="simple-icons:naver" />
          네이버로 시작하기
        </button>
      </div>
    </div>
  )
}

export default Page
