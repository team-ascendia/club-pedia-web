"use client"

import { setCookie } from "cookies-next"
import ky from "ky"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import useSignup from "@/src/domain/signup/context/signup-context"

interface IAuthResponse {
  accessToken: string
  isSignup: boolean
  name: string
  phoneNumber: string
  birthday: string
  gender: string
  email: string
}

interface ISocialType {
  socialType: string
}

const SocialLogin = ({ socialType }: ISocialType) => {
  const router = useRouter()
  const { setFilterPages, setUser, handleYear, handleMonth, handleDay } = useSignup()
  const redirectUriMap: Record<string, string | undefined> = {
    kakao: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL,
    google: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL,
    naver: process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL,
  }

  const redirectUri = redirectUriMap[socialType]

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code")
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

    const fetchAuthData = async () => {
      if (code) {
        await ky
          .post(`${baseUrl}/auth/social/${socialType}`, {
            json: { code, redirectUri },
            headers: { Accept: "application/json" },
          })

          .json<IAuthResponse>()
          .then(data => {
            setCookie("accessToken", data.accessToken, {
              path: "/",
              httpOnly: false,
              maxAge: 60 * 60 * 24 * 7,
            })
            const formattedBirthday = data?.birthday?.split("T")[0]
            const [year, month, day] = formattedBirthday ? formattedBirthday.split("-") : ["", "", ""]

            const userData = {
              name: data.name ?? "",
              phoneNumber: data.phoneNumber ?? "",
              birthday: formattedBirthday ?? "",
              gender: data.gender ?? "",
              email: data.email ?? "",
            }

            // console.log("userData", userData)

            if (data.isSignup === true) {
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
          })
      }
    }

    fetchAuthData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>로그인 중입니다...</div>
}

export default SocialLogin
