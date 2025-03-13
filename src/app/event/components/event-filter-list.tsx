"use client"

import { RotateIcon } from "@/public/icons"
import Badge from "@/src/common/components/badge"
import { isAllUndefined } from "@/src/common/util/check-undefined"
import OpenFilterSheetBadge from "@/src/domain/club/components/open-filter-sheet-badge"
import useClubFilters from "@/src/domain/club/hooks/use-club-filters"

const EventFilterList = () => {
  const { filters, resetFilters, formatArrayFilter, openSheet, formatDate } = useClubFilters({ queryKey: ["event"] })

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
        title={formatDate({ startDate: filters.date?.startDate, endDate: filters.date?.endDate, defaultTitle: "날짜" })}
        handleClick={openSheet.calendar}
        active={filters.date !== undefined}
      />
    </>
  )
}

export default EventFilterList
