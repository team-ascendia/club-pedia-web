import Badge from "@/src/common/components/badge"
import { FilterRequiredProps } from "@/src/common/util/types/filter.type"

interface SelectBadgeProps {
  active: boolean
  item?: FilterRequiredProps
  handleClickItem: () => void
}

const SelectBadge = (props: SelectBadgeProps) => {
  const { active, handleClickItem, item } = props
  return (
    <Badge
      as="button"
      className="flex h-8 justify-between"
      color="primary"
      outline={!active}
      outlineColor="gray"
      paddingSize="default"
      onClick={handleClickItem}
      active={active}
    >
      <p className="text-body1 leading-4">{item?.title ?? "전체"}</p>
    </Badge>
  )
}

export default SelectBadge
