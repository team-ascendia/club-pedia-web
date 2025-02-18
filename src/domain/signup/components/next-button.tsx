"use client"

import { useRouter } from "next/navigation"

interface NextButtonProps {
  isActive?: boolean
  nextPath?: string
  onClick?: () => void
  children: React.ReactNode
}

const NextButton: React.FC<NextButtonProps> = ({ isActive = false, nextPath, onClick, children }) => {
  const router = useRouter()

  const handleClick = () => {
    onClick?.()
    if (nextPath) {
      router.push(nextPath)
    }
  }

  return (
    <button
      disabled={!isActive}
      onClick={handleClick}
      className={`rounded-2 mb-14 flex w-full items-center justify-center px-6 py-[14px] text-base text-white 
      ${isActive ? "bg-primary-400 " : "bg-gray-300"} 
      transition-colors duration-300`}
    >
      {children}
    </button>
  )
}

export default NextButton
