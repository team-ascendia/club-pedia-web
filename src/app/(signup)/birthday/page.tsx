"use client"

import Header from "@/src/common/components/bar/header"
import BirthBox from "@/src/domain/sign/components/birth-box"
import NextButton from "@/src/domain/sign/components/next-button"
import Title from "@/src/domain/sign/components/title"
import useSignup from "@/src/domain/sign/context/signup-context"

const Page = () => {
  const { day, month, handleMonth, handleDay, setBirthday, isValidBirth, currentIndex, nextPage, NextPageName } =
    useSignup()

  const handleNext = () => {
    setBirthday()
    handleMonth(month.padStart(2, "0"))
    handleDay(day.padStart(2, "0"))
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
