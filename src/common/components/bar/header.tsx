"use client"

import { Icon } from "@iconify/react"
import { useRouter } from "next/navigation"
import useSignup from "@/src/domain/signup/context/signup-context"

interface HeaderProps {
  title?: string
  showClose?: boolean
  showBack?: boolean
}

const Header: React.FC<HeaderProps> = ({ title, showClose = false, showBack = false }) => {
  const { backPage } = useSignup()
  const router = useRouter()

  const handleBack = () => {
    backPage()
    router.back()
  }

  const handleClose = () => {
    router.push("/")
  }

  return (
    <div className="flex items-center border-b px-2 py-3">
      {showBack && (
        <button onClick={handleBack} className="text-xl">
          <Icon icon="mingcute:left-line" className="text-xl" />
        </button>
      )}
      {title && <div className="grow text-center text-lg font-bold">{title}</div>}
      {showClose && (
        <button onClick={handleClose} className="text-lg">
          ✕
        </button>
      )}
    </div>
  )
}

export default Header
