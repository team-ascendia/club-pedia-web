import { useEffect, useState } from "react"
import { FilterRequiredProps, RenderItemProps } from "./type"
import ModalLayout from "@/src/common/components/modal/modal-layout"
import withModalHoc from "@/src/common/components/modal/with-modal-hoc"

interface MultiSelectItemBottomSheetProps<T extends FilterRequiredProps> {
  items: T[]
  defaultData?: T[]
  title: string
  handleSubmit: (data: T[]) => void
  renderItem: (props: RenderItemProps<T>) => React.JSX.Element
}

const MultiSelectItemBottomSheet = withModalHoc<MultiSelectItemBottomSheetProps<FilterRequiredProps>>(
  ({ close, isOpen, defaultData, handleSubmit, items, renderItem, title }) => {
    const [selectedData, setSelectedData] = useState(defaultData ?? [])

    useEffect(() => {
      if (defaultData) setSelectedData(defaultData)
    }, [defaultData])

    const handleItemClick = (item: FilterRequiredProps) => {
      setSelectedData(prev => {
        const exists = prev.some(selected => selected.id === item.id)
        return exists ? prev.filter(selected => selected.id !== item.id) : [...prev, item]
      })
    }

    const handleSubmitClick = () => {
      close()
      handleSubmit(selectedData)
    }

    return (
      <ModalLayout
        withBottomSheetAnimation
        withBottomSheetDragHandler
        isOpen={isOpen}
        close={close}
        className="rounded-t-3 w-full bg-white pb-6"
      >
        <div className="w-full px-6">
          <div className="flex justify-between">
            <div className="size-6" />
            <p className="text-title1">{title}</p>
            <button className="size-6" onClick={() => close()}>
              X
            </button>
          </div>
          <div className="flex flex-col">
            {items.map(item => {
              const active = selectedData.some(selected => selected.id === item.id)
              return (
                <button className="text-start" key={item.id} onClick={() => handleItemClick(item)}>
                  {renderItem({ active, item })}
                </button>
              )
            })}
          </div>
          <button
            onClick={handleSubmitClick}
            className="bg-primary-400 rounded-2 text-title6 w-full px-6 py-[14px] text-white"
          >
            적용
          </button>
        </div>
      </ModalLayout>
    )
  },
)

export default MultiSelectItemBottomSheet
