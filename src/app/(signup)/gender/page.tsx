"use client"

import { useEffect, useState } from "react"
import Header from "@/src/common/components/bar/header"
import GenderBox from "@/src/domain/signup/components/gender-box"
import NextButton from "@/src/domain/signup/components/next-button"
import Title from "@/src/domain/signup/components/title"
import useSignup from "@/src/domain/signup/context/signup-context"
import { TUser } from "@/src/domain/types/user"

const Page = () => {
  const { setUser, user, currentIndex, nextPage, NextPageName } = useSignup()
  const [checked, setChecked] = useState<[boolean, boolean]>([false, false])

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

  const handleClick = () => {
    nextPage()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="grow">
        <Header showBack />
        <Title index={currentIndex} title="성별을 입력해주세요" />
        <GenderBox checked={checked} handleChangeMale={handleChangeMale} handleChangeFemale={handleChangeFemale} />
      </div>

      <NextButton onClick={handleClick} nextPath={`/${NextPageName}`} isActive={checked.some(Boolean)}>
        다음
      </NextButton>
    </div>
  )
}

export default Page
