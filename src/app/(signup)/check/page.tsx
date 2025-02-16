"use client"

import CircleChecked from "@mui/icons-material/CheckCircleOutline"
import { useEffect, useState } from "react"
import Header from "@/src/common/components/bar/header"
import NextButton from "@/src/common/components/button/_next-button"
import BirthBox from "@/src/domain/signup/components/birth-box"
import GenderBox from "@/src/domain/signup/components/gender-box"
import Title from "@/src/domain/signup/components/title"
import useSignup from "@/src/domain/signup/context/signup-context"

const parseEmail = (email: string = "") => {
  const [local, domain] = email.split("@")
  return { local, domain }
}

const Page = () => {
  const { user, error, setUserName, phoneError, setPhoneNum, setBirthday, isValidTotal, currentIndex } = useSignup()
  const { local, domain } = parseEmail(user?.email)
  const [checked, setChecked] = useState<[boolean, boolean]>([false, false])

  useEffect(() => {
    if (user?.gender === "MALE") {
      setChecked([true, false])
    } else {
      setChecked([false, true])
    }
  }, [user?.gender])

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setUserName(inputValue)
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    setPhoneNum(input)
  }

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, false])
  }

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([false, event.target.checked])
  }

  const handleClick = () => {
    setBirthday()
    if (checked[0] === true && user) {
      user.gender = "MALE"
    } else if (checked[1] === true && user) {
      user.gender = "FEMALE"
    } else {
      return
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="grow">
        <Header showBack />
        <Title index={currentIndex} title="정보를 확인해주세요" />
        <div className="mb-2 mt-3 text-xs">이메일</div>
        <div className="flex gap-x-2 text-base font-normal">
          <div className="h-6 w-40 border-b border-gray-400 pb-1">{local}</div>@
          <div className="h-6 w-36 border-b border-gray-400 pb-1">{domain}</div>
        </div>
        <div className="mb-4 mt-7 text-xs">이름</div>
        <input
          value={user?.name ?? ""}
          onChange={handleName}
          className="w-full border-b border-gray-400 pb-1 text-base font-normal"
        />
        {error && (
          <div className="text-12 mt-2 flex flex-col text-[#FF0000]">
            <div className="flex items-center gap-x-1">
              <CircleChecked fontSize="small" style={{ fontSize: "12px" }} />
              최소 2글자 이상 작성해야 합니다.
            </div>
            <div className="flex items-center gap-x-1">
              <CircleChecked fontSize="small" style={{ fontSize: "12px" }} />
              이름에는 완성형 한글만 입력가능합니다.
            </div>
          </div>
        )}
        <div className="mb-4 mt-7 text-xs">전화번호</div>
        <input
          value={user?.phone ?? ""}
          onChange={handleInput}
          className="w-full border-b border-gray-400 pb-1 text-base font-normal"
        />
        {phoneError && (
          <div className="text-12 mt-2 flex items-center gap-x-1  text-[#FF0000]">
            <CircleChecked fontSize="small" style={{ fontSize: "12px" }} />
            전화번호가 올바르지 않습니다
          </div>
        )}
        <div className="mb-2 mt-7 text-xs">생년원일</div>
        <BirthBox />
        <div className="mb-2 mt-7 text-xs">성별</div>
        <GenderBox checked={checked} handleChange1={handleChange1} handleChange2={handleChange2} />
      </div>

      <NextButton isActive={checked.some(Boolean) && isValidTotal()} onClick={handleClick}>
        다음
      </NextButton>
    </div>
  )
}

export default Page
