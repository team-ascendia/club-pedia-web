"use client"

import CircleChecked from "@mui/icons-material/CheckCircleOutline"
import { useEffect, useState } from "react"
import Header from "@/src/common/components/bar/header"
import BirthBox from "@/src/domain/signup/components/birth-box"
import GenderBox from "@/src/domain/signup/components/gender-box"
import NextButton from "@/src/domain/signup/components/next-button"
import Title from "@/src/domain/signup/components/title"
import useSignup from "@/src/domain/signup/context/signup-context"
import { TUser } from "@/src/domain/types/user"

const parseEmail = (email: string = "") => {
  const [local, domain] = email.split("@")
  return { local, domain }
}

const Page = () => {
  const { setUser, setUserName, setUserCheck, user, error, phoneError, setPhoneNum, isValidTotal, currentIndex } =
    useSignup()
  const { local, domain } = parseEmail(user?.email)
  const [checked, setChecked] = useState<[boolean, boolean]>([false, false])

  useEffect(() => {
    setUserCheck(user?.name ?? "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    setPhoneNum(input)
  }

  const handleChangeMale = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, false])
  }

  const handleChangeFemale = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([false, event.target.checked])
  }

  useEffect(() => {
    setUser({
      ...user,
      gender: checked[0] ? "MALE" : "FEMALE",
    } as TUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked])

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
          value={user?.phoneNumber ?? ""}
          onChange={handlePhoneNumber}
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
        <GenderBox checked={checked} handleChangeMale={handleChangeMale} handleChangeFemale={handleChangeFemale} />
      </div>

      <NextButton isActive={checked.some(Boolean) && isValidTotal()}>다음</NextButton>
    </div>
  )
}

export default Page
