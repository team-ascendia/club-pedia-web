import { Fragment, useState } from "react"
import SelectWarpper from "./select-warpper"
import { SelectRenderItemProps } from "./type"
import withModalHoc from "@/src/common/components/modal/hocs/with-modal-hoc"
import ModalLayout from "@/src/common/components/modal/modal-layout"
import { ModalComponentRequiredProps } from "@/src/common/module/modal-manager"
import { FilterRequiredProps } from "@/src/common/util/types/filter.type"

interface MultiSelectItemBottomSheetProps<T extends FilterRequiredProps> extends ModalComponentRequiredProps {
  items: T[]
  defaultData?: T[]
  title: string
  handleSubmit: (data?: T[]) => void
  renderItem: (props: SelectRenderItemProps<T | undefined>) => React.JSX.Element
  contentClassName?: string
}

const MultiSelectItemBottomSheet = withModalHoc(
  <T extends FilterRequiredProps>(props: MultiSelectItemBottomSheetProps<T>) => {
    const { close, isOpen, defaultData, handleSubmit, items, renderItem, title, contentClassName } = props
    const [selectedData, setSelectedData] = useState(defaultData ?? [])

    const handleClickItem = (item?: FilterRequiredProps) => {
      setSelectedData(prev => {
        if (!item) return []
        const exists = prev.some(selected => selected.id === item.id)
        return exists ? prev.filter(selected => selected.id !== item.id) : ([...prev, item] as T[])
      })
    }

    const handleSubmitClick = () => {
      close()
      handleSubmit(selectedData)
    }

    return (
      <ModalLayout withBottomSheetAnimation isOpen={isOpen} close={close} className="rounded-t-3 w-full bg-white py-6">
        <SelectWarpper close={close} handleSubmitClick={handleSubmitClick} title={title}>
          <div className={contentClassName}>
            {renderItem({
              active: selectedData.length === 0,
              item: undefined,
              handleClickItem: () => handleClickItem(undefined),
            })}
            {items.map(item => {
              const active = selectedData.some(selected => selected.id === item.id)
              return (
                <Fragment key={item.id}>
                  {renderItem({ active, item, handleClickItem: () => handleClickItem(item) })}
                </Fragment>
              )
            })}
          </div>
        </SelectWarpper>
      </ModalLayout>
    )
  },
)

export default MultiSelectItemBottomSheet
