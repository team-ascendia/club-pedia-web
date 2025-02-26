"use client"

// import { useEffect, useState } from "react"
import Header from "@/src/common/components/bar/header"
import GenderBox from "@/src/domain/sign/components/gender-box"
import NextButton from "@/src/domain/sign/components/next-button"
import Title from "@/src/domain/sign/components/title"
import useSignup from "@/src/domain/sign/context/signup-context"

const Page = () => {
  const { user, currentIndex, nextPage, NextPageName } = useSignup()

  const handleClick = () => {
    nextPage()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="grow">
        <Header showBack />
        <Title index={currentIndex} title="성별을 입력해주세요" />
        <GenderBox />
      </div>
      <NextButton onClick={handleClick} nextPath={`/${NextPageName}`} isActive={!!user?.gender}>
        다음
      </NextButton>
    </div>
  )
}

export default Page
