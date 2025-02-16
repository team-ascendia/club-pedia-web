"use client"

import { Icon } from "@iconify/react"
import CircleChecked from "@mui/icons-material/CheckCircleOutline"
import Header from "@/src/common/components/bar/header"
import NextButton from "@/src/common/components/button/_next-button"
import Title from "@/src/domain/signup/components/title"
import useSignup from "@/src/domain/signup/context/signup-context"

const Page = () => {
  const { user, error, setUserName, nextPage, currentIndex, NextPageName } = useSignup()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setUserName(inputValue)
  }

  const handleClear = () => {
    if (user) {
      user.name = ""
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="grow">
        <Header showBack />
        <Title index={currentIndex} title="이름을 입력해주세요" />
        <div
          className={`flex items-center justify-between gap-x-2  border-b ${!error ? "border-gray-400" : "border-primary-400"}  px-1 py-2`}
        >
          <input
            value={user?.name ?? ""}
            onChange={handleChange}
            placeholder="이름"
            className="flex-1 overflow-auto outline-none"
          />
          <Icon onClick={handleClear} icon="lets-icons:close-ring-duotone" className="text-xl" />
        </div>
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
      </div>

      <NextButton onClick={nextPage} isActive={!error && !!user?.name} nextPath={`/${NextPageName}`}>
        다음
      </NextButton>
    </div>
  )
}

export default Page
