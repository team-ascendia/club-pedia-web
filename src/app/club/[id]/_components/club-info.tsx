import { ArrowLeftIcon } from "@/public/icons"
import Badge from "@/src/common/components/badge"

const ClubInfo = () => {
  return (
    <div>
      {/* Image */}
      <div className="h-[220px] w-full bg-gray-300"></div>
      {/* Ifno */}
      <div className="px-6 pb-[22px] pt-2.5">
        <div className="flex flex-col gap-[5px] py-[5px]">
          <p>강남동</p>
          <p>W클럽</p>
          <div className="flex w-full items-center gap-2.5">
            <div className="flex gap-[5px]">
              <ArrowLeftIcon className="size-6 text-cyan-500" />
              <p>4.5</p>
            </div>
            {`후기 159개`}
          </div>
        </div>
        <div className="mt-2.5" />
        <div className="flex w-full gap-[5px]">
          <Badge as={"span"} color="primary" className="text-body7">
            EDM
          </Badge>
          <Badge as={"span"} color="primary" className="text-body7">
            힙합
          </Badge>
        </div>
      </div>
      {/* Tag */}
    </div>
  )
}

export default ClubInfo
