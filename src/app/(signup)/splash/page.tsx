"use client"

import { Icon } from "@iconify/react"
import Header from "@/src/common/components/bar/header"
import Kakao from "@/src/domain/oauth/kakao"

const Page = () => {
  const handleKakaoLogin = () => {
    Kakao({ redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL })
  }

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
		&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}
		&response_type=code
		&scope=email profile`
  }

  const handleNaverLogin = () => {
    const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_AUTH_CLIENT_ID
    const REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL
    const STATE = Math.random().toString(36).substring(2, 15)
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`
    window.location.href = NAVER_AUTH_URL
  }

  return (
    <div>
      <Header title="회원가입" showClose />
      <div className="font-pretendard mb-80 mt-[52px] whitespace-pre-line text-[24px] font-semibold leading-normal tracking-[-0.48px]">
        회원가입을 통해{"\n"} 재밌는 클럽 소식을{"\n"} 손쉽게 얻어가세요 🎉
      </div>
      <div className="flex flex-col gap-y-5">
        <button
          onClick={handleKakaoLogin}
          className="flex items-center justify-center gap-x-2 rounded-xl bg-yellow-50 p-4 text-base font-medium"
        >
          <Icon icon="raphael:bubble" />
          카카오로 시작하기
        </button>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-x-2 rounded-xl border border-gray-400 p-4 text-base font-medium"
        >
          <Icon icon="flat-color-icons:google" />
          구글로 시작하기
        </button>
        <button
          onClick={handleNaverLogin}
          className="flex items-center justify-center gap-x-2 rounded-xl bg-[#02C759] p-4 text-base font-medium text-white"
        >
          <Icon icon="simple-icons:naver" />
          네이버로 시작하기
        </button>
      </div>
    </div>
  )
}

export default Page
