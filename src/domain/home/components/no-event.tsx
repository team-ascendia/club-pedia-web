import { SadIcon } from "@/public/icons"

const NoEvent = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center px-6 py-5">
      <SadIcon className="size-11" />
      <div className="text-body6 mt-[19px] text-gray-500">예정된 이벤트가 없어요</div>
    </div>
  )
}

export default NoEvent
