"use client"

import Header from "@/src/common/components/bar/header"
import BirthBox from "@/src/domain/signup/components/birth-box"
import NextButton from "@/src/domain/signup/components/next-button"
import Title from "@/src/domain/signup/components/title"
import useSignup from "@/src/domain/signup/context/signup-context"

const Page = () => {
  const { setBirthday, isValidBirth, currentIndex, nextPage, NextPageName } = useSignup()

  const handleNext = () => {
    setBirthday()
    nextPage()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="grow">
        <Header showBack />
        <Title index={currentIndex} title="생년원일 입력해주세요" />
        <BirthBox />
      </div>

      <NextButton isActive={isValidBirth()} onClick={handleNext} nextPath={`/${NextPageName}`}>
        다음
      </NextButton>
    </div>
  )
}

export default Page
