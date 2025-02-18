"use client"

import CircleChecked from "@mui/icons-material/CheckCircleOutline"
import Header from "@/src/common/components/bar/header"
import NextButton from "@/src/domain/signup/components/next-button"
import Title from "@/src/domain/signup/components/title"
import useSignup from "@/src/domain/signup/context/signup-context"

const Page = () => {
  const { user, phoneError, setPhoneNum, currentIndex, nextPage, NextPageName } = useSignup()

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    setPhoneNum(input)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="grow">
        <Header showBack />
        <Title index={currentIndex} title="전화번호를 입력해주세요" />
        <div
          className={`flex items-center border-b  ${!phoneError ? "border-gray-400" : "border-primary-400"} px-1 py-2`}
        >
          <input
            value={user?.phoneNumber ?? ""}
            onChange={handleInput}
            placeholder="전화번호"
            className="flex-1 overflow-auto outline-none"
          />
        </div>
        {phoneError && (
          <div className="text-12 mt-2 flex items-center gap-x-1  text-[#FF0000]">
            <CircleChecked fontSize="small" style={{ fontSize: "12px" }} />
            전화번호가 올바르지 않습니다
          </div>
        )}
      </div>

      <NextButton nextPath={`/${NextPageName}`} onClick={nextPage} isActive={!phoneError && !!user?.phoneNumber}>
        다음
      </NextButton>
    </div>
  )
}

export default Page
