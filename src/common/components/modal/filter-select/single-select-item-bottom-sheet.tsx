"use client"

import { Fragment, useState } from "react"
import SelectWarpper from "./select-warpper"
import { SelectRenderItemProps } from "./type"
import withModalHoc from "@/src/common/components/modal/hocs/with-modal-hoc"
import ModalLayout from "@/src/common/components/modal/modal-layout"
import { ModalComponentRequiredProps } from "@/src/common/module/modal-manager"
import { FilterRequiredProps } from "@/src/common/util/types/filter.type"

interface SingleSelectBottomSheetProps<T extends FilterRequiredProps> extends ModalComponentRequiredProps {
  items: T[]
  defaultData?: T
  title: string
  handleSubmit: (data?: T) => void
  renderItem: (props: SelectRenderItemProps<T | undefined>) => React.JSX.Element
  contentClassName?: string
}

const SingleSelectItemBottomSheet = withModalHoc(
  <T extends FilterRequiredProps>(props: SingleSelectBottomSheetProps<T>) => {
    const { close, isOpen, defaultData, handleSubmit, items, renderItem, title, contentClassName } = props
    const [selectedData, setSelectedData] = useState<T | undefined>(defaultData)

    const handleClickItem = (item?: T) => {
      setSelectedData(item)
    }

    const handleSubmitClick = () => {
      handleSubmit(selectedData)
      close()
    }

    return (
      <ModalLayout withBottomSheetAnimation isOpen={isOpen} close={close} className="rounded-t-3 w-full bg-white py-6">
        <SelectWarpper close={close} handleSubmitClick={handleSubmitClick} title={title}>
          <div className={contentClassName}>
            {renderItem({
              active: !selectedData,
              item: undefined,
              handleClickItem: () => handleClickItem(undefined),
            })}
            {items.map(item => {
              const active = selectedData?.id === item.id
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

export default SingleSelectItemBottomSheet
