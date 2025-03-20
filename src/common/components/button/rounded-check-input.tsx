import { InputHTMLAttributes, RefObject } from "react"
import cn from "@/src/common/util/cn"

interface RoundedCheckInputProps extends InputHTMLAttributes<HTMLInputElement> {
  active: boolean
  name: string
  ref?: RefObject<HTMLInputElement | null>
}

const RoundedCheckInput = (props: RoundedCheckInputProps) => {
  const { active, name, className, ref, ...rest } = props
  return (
    <>
      <input ref={ref} type="checkbox" id={name} className="hidden" {...rest} />
      <label
        htmlFor={name}
        className={cn(
          "flex size-5 items-center justify-center rounded-full border-[2px] border-gray-400 p-[3px] font-medium hover:cursor-pointer",
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
