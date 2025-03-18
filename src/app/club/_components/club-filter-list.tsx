"use client"

import { RotateIcon } from "@/public/icons"
import Badge from "@/src/common/components/badge"
import { isAllUndefined } from "@/src/common/util/check-undefined"
import OpenFilterSheetBadge from "@/src/domain/club/components/open-filter-sheet-badge"
import useClubFilters from "@/src/domain/club/hooks/use-club-filters"

const ClubFilterList = () => {
  const { filters, resetFilters, formatArrayFilter, openSheet } = useClubFilters({ queryKey: ["club"] })

  return (
    <>
      {!isAllUndefined(filters) && (
        <Badge
          className="flex h-8 shrink-0 items-center gap-2.5 break-all text-gray-500"
          outline
          onClick={resetFilters}
        >
          <p className="text-body4">초기화</p>
          <RotateIcon className="size-4 text-gray-500" />
        </Badge>
      )}
      <OpenFilterSheetBadge
        title={formatArrayFilter({ filter: filters.regions, defaultTitle: "지역" })}
        handleClick={openSheet.region}
        active={filters.regions ? filters.regions.length > 0 : false}
      />
      <OpenFilterSheetBadge
        title={formatArrayFilter({ filter: filters.genres, defaultTitle: "음악장르" })}
        handleClick={openSheet.genre}
        active={filters.genres ? filters.genres.length > 0 : false}
      />
      <OpenFilterSheetBadge
        title={filters.price ? filters.price.title : "입장료"}
        handleClick={openSheet.price}
        active={filters.price !== undefined}
      />
      <OpenFilterSheetBadge
        title={filters.isOpen ? filters.isOpen.title : "영업 여부"}
        handleClick={openSheet.isOpen}
        active={filters.isOpen !== undefined}
      />
    </>
  )
}

export default ClubFilterList
