"use client"

import { useState } from "react"
import Header from "@/src/common/components/bar/header"
import NextButton from "@/src/common/components/button/_next-button"
import GenderBox from "@/src/domain/signup/components/gender-box"
import Title from "@/src/domain/signup/components/title"
import useSignup from "@/src/domain/signup/context/signup-context"

const Page = () => {
  const { user, currentIndex, nextPage, NextPageName } = useSignup()
  const [checked, setChecked] = useState<[boolean, boolean]>([false, false])

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, false])
  }

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([false, event.target.checked])
  }

  const handleClick = () => {
    nextPage()
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
        <Title index={currentIndex} title="성별을 입력해주세요" />
        <GenderBox checked={checked} handleChange1={handleChange1} handleChange2={handleChange2} />
      </div>

      <NextButton onClick={handleClick} nextPath={`/${NextPageName}`} isActive={checked.some(Boolean)}>
        다음
      </NextButton>
    </div>
  )
}

export default Page
