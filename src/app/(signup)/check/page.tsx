"use client"

import CircleChecked from "@mui/icons-material/CheckCircleOutline"
import { useEffect } from "react"
import Header from "@/src/common/components/bar/header"
import { modalManager } from "@/src/common/module/modal-manager"
import BirthBox from "@/src/domain/sign/components/birth-box"
import GenderBox from "@/src/domain/sign/components/gender-box"
import NextButton from "@/src/domain/sign/components/next-button"
import SignBottomSheet from "@/src/domain/sign/components/sign-bottom-sheet"
import Title from "@/src/domain/sign/components/title"
import useSignup from "@/src/domain/sign/context/signup-context"

const parseEmail = (email: string = "") => {
  const [local, domain] = email.split("@")
  return { local, domain }
}

const Page = () => {
  const { setUserName, setUserCheck, user, error, phoneError, setPhoneNum, isValidTotal, currentIndex } = useSignup()
  const { local, domain } = parseEmail(user?.email)

  useEffect(() => {
    setUserCheck(user?.name ?? "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setUserName(inputValue)
  }

  const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    setPhoneNum(input)
  }

  const handleClickNextButton = () => {
    if (!user) return

    modalManager.open({
      Component: SignBottomSheet,
      componentProps: {
        userInfo: user,
      },
      id: "terms-bottom-sheet",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="grow">
        <Header showBack />
        <Title index={currentIndex} title="정보를 확인해주세요" />
        <div className="text-body6 mb-2 mt-3">이메일</div>

        <div className="flex gap-x-2 text-base font-normal">
          <div className="h-6 w-40 border-b border-gray-400 pb-1">{local}</div>@
          <div className="h-6 w-36 border-b border-gray-400 pb-1">{domain}</div>
        </div>
        <div className="text-body6 mb-4 mt-7">이름</div>
        <input
          value={user?.name ?? ""}
          onChange={handleName}
          className="w-full border-b border-gray-400 pb-1 text-base font-normal"
        />
        {error && (
          <div className="text-body6 mt-2 flex flex-col text-[#FF0000]">
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
        <div className="text-body6 mb-4 mt-7">전화번호</div>
        <input
          value={user?.phoneNumber ?? ""}
          onChange={handlePhoneNumber}
          className="w-full border-b border-gray-400 pb-1 text-base font-normal"
        />
        {phoneError && (
          <div className="text-body6 mt-2 flex items-center gap-x-1  text-[#FF0000]">
            <CircleChecked fontSize="small" style={{ fontSize: "12px" }} />
            전화번호가 올바르지 않습니다
          </div>
        )}
        <div className="text-body6 mb-2 mt-7">생년원일</div>
        <BirthBox />
        <div className="text-body6 mb-2 mt-7">성별</div>
        <GenderBox />
      </div>

      <NextButton onClick={handleClickNextButton} isActive={!!user?.gender && isValidTotal()}>
        다음
      </NextButton>
    </div>
  )
}

export default Page
