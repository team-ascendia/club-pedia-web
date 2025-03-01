"use client"

import { useMutation } from "@tanstack/react-query"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import signApi from "@/src/domain/api"
import useSignup from "@/src/domain/sign/context/signup-context"

interface SocialType {
  socialType: string
}

const SocialLogin = ({ socialType }: SocialType) => {
  const router = useRouter()
  const { setFilterPages, setUser, handleYear, handleMonth, handleDay } = useSignup()
  const redirectUriMap: Record<string, string | undefined> = {
    kakao: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL,
    google: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL,
    naver: process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL,
  }
  const redirectUri = redirectUriMap[socialType]

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (code: string) => signApi.socialLogin(socialType, code, redirectUri),
    onSuccess: data => {
      const formattedBirthday = data?.birthday?.split("T")[0]
      const [year, month, day] = formattedBirthday ? formattedBirthday.split("-") : ["", "", ""]

      const userData = {
        name: data.name ?? "",
        phoneNumber: data.phoneNumber ?? "",
        birthday: formattedBirthday ?? "",
        gender: data.gender ?? "",
        email: data.email ?? "",
        accessToken: data.accessToken ?? "",
      }

      if (data.isSignup === true) {
        setCookie("accessToken", data.accessToken, {
          path: "/",
          httpOnly: false,
          maxAge: 60 * 60 * 24 * 7,
        })
        router.push("/")
      } else if (data.isSignup === false) {
        setUser(userData)
        handleYear(year)
        handleMonth(month)
        handleDay(day)

        const pages = ["name", "phone", "birthday", "gender", "check"]
        const keyMapping = { name: "name", phone: "phoneNumber", birthday: "birthday", gender: "gender" }

        const updatedFilterPages = pages.filter(page => {
          const mappedKey = keyMapping[page as keyof typeof keyMapping]
          return mappedKey && !(userData as any)[mappedKey]
        })

        if (!updatedFilterPages.includes("check")) {
          updatedFilterPages.push("check")
        }

        // console.log("🚀 [필터 페이지 최종]:", updatedFilterPages)
        setFilterPages(updatedFilterPages)

        router.push(`/${updatedFilterPages[0]}`)
      }
    },
  })

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code")

    if (code) {
      mutate(code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isPending) {
    return <div>로그인 중입니다...</div>
  }
  if (isError) {
    return <div>로그인 실패...</div>
  }
}

export default SocialLogin
