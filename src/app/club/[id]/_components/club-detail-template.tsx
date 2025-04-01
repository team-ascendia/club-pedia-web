"use client"

import ClubEvent from "./club-event"
import ClubInfo from "./club-info"
import ClubOotd from "./club-ootd"
import ClubReview from "./club-review"
import useTab from "@/src/common/hooks/use-tab"

const TAB_LIST = ["클럽 정보", "OOTD", "후기", "이벤트"] as const

const ClubDetailTemplate = () => {
  const { TabComponent, currentTab, handleSetTab } = useTab({
    tabList: TAB_LIST,
  })

  return (
    <div className="relative">
      <TabComponent
        className="!top-[var(--header-height)] flex h-12 border-b border-gray-100 bg-white px-6"
        itemClassName="flex-1 text-body2 text-black"
        activeUnderline
        activeUnderlineOffset={18}
        sticky
      />
      {currentTab === "클럽 정보" && (
        <ClubInfo onClickMoreViewOOTD={() => handleSetTab("OOTD")} onClickMoreViewReview={() => handleSetTab("후기")} />
      )}
      {currentTab === "OOTD" && <ClubOotd />}
      {currentTab === "후기" && <ClubReview />}
      {currentTab === "이벤트" && <ClubEvent />}
    </div>
  )
}

export default ClubDetailTemplate
