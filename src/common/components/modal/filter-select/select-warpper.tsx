import { PropsWithChildren } from "react"
import { CloseIcon } from "@/public/icons"

interface SelectWarpperProps extends PropsWithChildren {
  close: () => void
  handleSubmitClick: () => void
  title: string
  disabledButton?: boolean
}

const SelectWarpper = (props: SelectWarpperProps) => {
  const { close, handleSubmitClick, title, children, disabledButton } = props
  return (
    <div className="flex w-full flex-col gap-7 px-6">
      <div className="flex items-center justify-between">
        <div className="size-6" />
        <p className="text-title1">{title}</p>
        <button className="size-6" onClick={() => close()}>
          <CloseIcon className="size-full text-gray-900" />
        </button>
      </div>
      {children}
      <button
        onClick={handleSubmitClick}
        disabled={disabledButton}
        className="bg-primary-400 rounded-2 text-title6 w-full px-6 py-[14px] text-white disabled:bg-gray-300"
      >
        선택
      </button>
    </div>
  )
}

export default SelectWarpper
