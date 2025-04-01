import { InformationIcon, SoundIcon, StarFillIcon } from "@/public/icons"

const DummyTag = ["EDM", "힙합"]

const ClubIntro = () => {
  return (
    <div>
      {/* Image */}
      <div className="h-[220px] w-full bg-gray-300"></div>
      {/* Ifno */}
      <div className="flex flex-col gap-2.5 px-6 pb-[22px] pt-2.5">
        <div className="flex flex-col gap-[5px] py-[5px]">
          <p className="text-body4 text-[#9C9C9C]">강남동</p>
          <p className="text-title4">W클럽</p>
          <div className="flex w-full items-center gap-2.5">
            <div className="flex items-center gap-[5px]">
              <StarFillIcon className="size-6 text-[#FFEB3B]" />
              <p className="text-body2">4.5</p>
            </div>
            <p className="text-body2">{`후기 159개`}</p>
          </div>
        </div>

        <div className="flex w-full gap-[5px]">
          <SoundIcon className="size-4 text-black" />
          <p>{DummyTag.join("•")}</p>
        </div>

        <div className="flex w-full gap-[5px]">
          <InformationIcon className="size-4 shrink-0 text-black" />
          <p className=" line-clamp-3 break-all">
            테스트테스트테스트테스트테스트테스트테스트트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
            테스트 테스트 테스트 테스트테스트테스트테스트테스트테스트테스트트 테스트 테스트 테스트 테스트 테스트 테스트
            테스트 테스트 테스트 테스트 테스트 테스트 테스트테스트테스트테스트테스트테스트테스트트 테스트 테스트 테스트
            테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
          </p>
        </div>
      </div>
      {/* Tag */}
    </div>
  )
}

export default ClubIntro
