import { InputHTMLAttributes } from "react"
import cn from "@/src/common/util/cn"

interface RoundedCheckInputProps extends InputHTMLAttributes<HTMLInputElement> {
  active: boolean
  name: string
}

const RoundedCheckInput = (props: RoundedCheckInputProps) => {
  const { active, onChange, name, className, ...rest } = props
  return (
    <>
      <input type="checkbox" id={name} className="hidden" onChange={onChange} {...rest} />
      <label
        htmlFor={name}
        className={cn(
          "flex size-6 items-center justify-center rounded-full border-[3px] border-gray-400 p-[3px] font-medium hover:cursor-pointer",
          className,
        )}
      >
        <div
          className={cn("opacity-0 transition-opacity size-full rounded-full duration-300 bg-primary-400", {
            "opacity-100": active,
          })}
        />
      </label>
    </>
  )
}

export default RoundedCheckInput
