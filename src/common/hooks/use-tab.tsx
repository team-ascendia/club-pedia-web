import { useState } from "react"
import cn from "@/src/common/util/cn"

type UseTabProps<T extends readonly string[]> = {
  tabList: T
}

type TabComponentProps = {
  className?: string
  itemClassName?: string
  activeUnderline?: boolean
  activeUnderlineOffset?: number
  sticky?: boolean
}

/**
 * Tab을 만들 때 사용합니다.
 * 
 * 배열을 as const로 선언한 뒤 tabList로 넘기면 타입 추론이 되어 타입 추론이 됩니다.
 * 
 * @example ```typescript
 * const TAB_LIST = ["클럽 정보", "OOTD", "후기", "이벤트"] as const
 *  const { TabComponent, currentTab, handleSetTab } = useTab({
 *                tabList: TAB_LIST,
  })
 * ```
 */
const useTab = <T extends readonly string[]>(props: UseTabProps<T>) => {
  const { tabList } = props
  const [currentTab, setCurrentTab] = useState<T[number]>(tabList[0])

  const TabComponent = (tabProps: TabComponentProps) => {
    const { className, itemClassName, activeUnderline, activeUnderlineOffset, sticky } = tabProps

    return (
      <div
        className={cn(className, {
          "top-0 sticky": sticky,
        })}
      >
        {tabList.map(tab => (
          <button
            style={activeUnderline ? { textUnderlineOffset: `${activeUnderlineOffset}px` } : {}}
            key={tab}
            className={cn("h-full", itemClassName, {
              "text-primary-500 text-title6": tab === currentTab,
              "underline decoration-primary-500 decoration": activeUnderline && tab === currentTab,
            })}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    )
  }

  const handleSetTab = (tab: T[number]) => {
    setCurrentTab(tab)
  }

  return {
    currentTab,
    handleSetTab,
    TabComponent,
  }
}

export default useTab
