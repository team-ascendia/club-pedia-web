"use client"

import { createContext, ReactNode, useContext, useState } from "react"
import { User } from "@/src/domain/types/user"

type AuthContextType = {
  user: User | null
  year: string
  month: string
  day: string
  error: boolean
  phoneError: boolean
  filterPages: string[]
  setFilterPages: React.Dispatch<React.SetStateAction<string[]>>
  setUser: (user: User) => void
  setUserName: (name: string) => void
  setUserCheck: (name: string) => void
  setPhoneNum: (phone: string) => void
  setBirthday: () => void
  setGender: (gender: string) => void
  handleYear: (input: string) => void
  handleMonth: (input: string) => void
  handleDay: (input: string) => void
  isValidBirth: () => boolean
  isValidTotal: () => boolean
  nextPage: () => void
  backPage: () => void
  NextPageName: string
  currentIndex: number
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const SignupProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    birthday: "",
    gender: "",
    phoneNumber: "",
    accessToken: "",
  })

  const [error, setError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")
  const [filterPages, setFilterPages] = useState<string[]>([])

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextPage = () => {
    setCurrentIndex(currentIndex + 1)
  }

  const backPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const NextPageName = filterPages[currentIndex + 1]

  const koreanRegex = /^[가-힣]{2,6}$/

  const setUserName = (name: string) => {
    // if (name.length > 6) return

    setUser(prev => ({ ...prev, name }))
    if (!koreanRegex.test(name) && name !== "") {
      setError(true)
    } else {
      setError(false)
    }
  }

  const setUserCheck = () => {
    if (!koreanRegex.test(user?.name ?? "") && user?.name !== "") {
      setError(true)
    } else {
      setError(false)
    }
  }

  const setPhoneNum = (input: string) => {
    const inputValue = input.replace(/\D/g, "")

    const formatted = inputValue.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3").substring(0, 13)

    setUser(prev => ({ ...prev, phoneNumber: formatted }))

    if (!inputValue.startsWith("010") || inputValue.length !== 11) {
      setPhoneError(true)
    } else {
      setPhoneError(false)
    }
  }

  const setGender = (input: string) => {
    setUser(prev => ({ ...prev, gender: input }))
  }

  const handleYear = (input: string) => setYear(input.replace(/\D/g, ""))
  const handleMonth = (input: string) => setMonth(input.replace(/\D/g, ""))
  const handleDay = (input: string) => setDay(input.replace(/\D/g, ""))

  const isValidBirth = () => {
    if (!year || !month || !day) return false
    if (year.length !== 4 || month.length > 2 || day.length > 2) return false

    const formattedMonth = month.padStart(2, "0")
    const formattedDay = day.padStart(2, "0")
    const inputBirth = `${year}-${formattedMonth}-${formattedDay}`

    const birthDate = new Date(inputBirth)
    const today = new Date()

    return (
      !isNaN(birthDate.getTime()) &&
      birthDate < today &&
      Number(month) >= 1 &&
      Number(month) <= 12 &&
      Number(day) >= 1 &&
      Number(day) <= 31
    )
  }

  const setBirthday = () => {
    if (isValidBirth()) {
      const formattedMonth = month.padStart(2, "0")
      const formattedDay = day.padStart(2, "0")
      const inputBirth = `${year}-${formattedMonth}-${formattedDay}`
      setUser(prev => ({ ...prev, birthday: inputBirth }))
    }
  }

  const isValidTotal = () => {
    if (!error && !phoneError && isValidBirth()) {
      return true
    } else {
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserName,
        error,
        phoneError,
        setPhoneNum,
        handleYear,
        handleMonth,
        handleDay,
        setBirthday,
        isValidBirth,
        year,
        month,
        day,
        isValidTotal,
        nextPage,
        NextPageName,
        filterPages,
        currentIndex,
        backPage,
        setUser,
        setFilterPages,
        setUserCheck,
        setGender,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useSignup = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

export default useSignup
