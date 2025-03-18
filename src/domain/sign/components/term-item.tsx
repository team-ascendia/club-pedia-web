import { useState } from "react"
import { ArrowLeftIcon } from "@/public/icons"
import RoundedCheckInput from "@/src/common/components/button/rounded-check-input"
import cn from "@/src/common/util/cn"

interface TermItemProps {
  required?: boolean
  active?: boolean
  title: string
  term: string
  handleChangeActive: () => void
}

const TermItem = (props: TermItemProps) => {
  const { required = false, active = false, title, term, handleChangeActive } = props
  const [isOpenTerm, setIsOpenTerm] = useState<boolean>(false)

  const handleClickTermOpenner = () => {
    setIsOpenTerm(prev => !prev)
  }

  return (
    <div className="overflow-hidden">
      <div className="flex w-full justify-between">
        <div className="flex flex-row items-center gap-[7px]">
          <RoundedCheckInput active={active} onChange={handleChangeActive} name={title} />
          <div
            className={cn("h-[22px] rounded-[11px] px-1 py-[3px] flex items-center justify-center", {
              "bg-primary-600": required,
              "bg-gray-300": !required,
            })}
          >
            <p className="body6 text-white">{required ? "필수" : "선택"}</p>
          </div>
          <p className="text-12">{title}</p>
        </div>
        <ArrowLeftIcon
          className={cn("size-6 hover:cursor-pointer rotate-180 text-gray-400 transition-all duration-300", {
            "rotate-[270deg]": isOpenTerm,
          })}
          onClick={handleClickTermOpenner}
        />
      </div>
      <div
        className={cn(
          "mx-auto w-[calc(100%-15px)] text-body6 overflow-scroll border-[0.5px] transition-[max-height,opacity,border-color] duration-300 ease-in-out px-[17.5px]",
          isOpenTerm
            ? "py-3 max-h-[300px] opacity-100 border-gray-300 mt-[26px]"
            : "max-h-0 opacity-0 border-transparent mt-0",
        )}
      >
        {isOpenTerm && term}
      </div>
    </div>
  )
}

export default TermItem
