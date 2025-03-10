import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { useEffect } from "react"
import CalendarSelectBottomSheet from "@/src/common/components/modal/filter-select/calendar-select-bottom-sheet"
import MultiSelectItemBottomSheet from "@/src/common/components/modal/filter-select/multiple-select-bottom-sheet"
import SelectBadge from "@/src/common/components/modal/filter-select/select-badge"
import SingleSelectItemBottomSheet from "@/src/common/components/modal/filter-select/single-select-item-bottom-sheet"
import useFilter from "@/src/common/hooks/use-filter"
import { modalManager } from "@/src/common/module/modal-manager"
import { DefaultListResponse } from "@/src/common/types/default-api.type"
import { formatDateRange } from "@/src/common/util/format"
import { IdAndTitle } from "@/src/common/util/types/default"
import clubApi from "@/src/domain/club/api"
import { ClubFilters } from "@/src/domain/club/type"

const PriceFilterList = [
  { id: 1, title: "무료", priceEnd: 0 },
  { id: 2, title: "10,000원 이하", priceStart: 1, priceEnd: 10000 },
  { id: 3, title: "10,000원 초과", priceStart: 10001 },
]

const IsOpenFilterList = [
  { id: 1, title: "영업 중", isOpen: true },
  { id: 2, title: "휴무 & 영업종료", isOpen: false },
]

interface UseClubFiltersProps {
  queryKey: string[]
}

const useClubFilters = (props: UseClubFiltersProps) => {
  const { queryKey } = props
  const { filters, resetFilters, setFilters, handleSetSearchParams } = useFilter<ClubFilters>()

  const { data: genreList, refetch: gerreRefetch } = useQuery({
    queryKey: [...queryKey, "filter", "genre"],
    queryFn: clubApi.getGenres,
    select: (data: DefaultListResponse<IdAndTitle>) => data.items,
    staleTime: Infinity,
  })

  const { data: regionList, refetch: regionRefetch } = useQuery({
    queryKey: [...queryKey, "filter", "region"],
    queryFn: clubApi.getRegions,
    select: (data: DefaultListResponse<IdAndTitle>) => data.items,
    staleTime: Infinity,
  })

  useEffect(() => {
    handleSetSearchParams({
      genres: filters.genres?.map(genre => genre.id),
      regions: filters.regions?.map(genre => genre.id),
      isOpen: filters.isOpen?.isOpen,
      startDate: filters.date?.startDate,
      endDate: filters.date?.endDate,
      priceStart: filters.price?.priceStart,
      priceEnd: filters.price?.priceEnd,
    })
  }, [filters])

  const handleSetFilter = (key: keyof ClubFilters) => (data: unknown) => {
    setFilters({ [key]: data })
  }

  const genreSheetOpen = () => {
    if (!genreList) {
      gerreRefetch()
      return
    }
    modalManager.open({
      Component: MultiSelectItemBottomSheet,
      componentProps: {
        title: "음악장르",
        handleSubmit: handleSetFilter("genres"),
        defaultData: filters.genres,
        items: genreList,
        renderItem: SelectBadge,
        contentClassName: "flex flex-wrap gap-x-2.5 gap-y-5 w-[306px] mx-auto",
      },
      id: "select-genre",
    })
  }

  const regionSheetOpen = () => {
    if (!regionList) {
      regionRefetch()
      return
    }
    modalManager.open({
      Component: MultiSelectItemBottomSheet,
      componentProps: {
        title: "지역",
        handleSubmit: handleSetFilter("regions"),
        defaultData: filters.regions,
        items: regionList,
        renderItem: SelectBadge,
        contentClassName: "flex flex-wrap gap-x-2.5 gap-y-5 w-[306px] mx-auto",
      },
      id: "select-region",
    })
  }

  const priceSheetOpen = () => {
    modalManager.open({
      Component: SingleSelectItemBottomSheet,
      componentProps: {
        title: "가격",
        handleSubmit: handleSetFilter("price"),
        defaultData: filters.price,
        items: PriceFilterList,
        renderItem: SelectBadge,
        contentClassName: "flex flex-wrap gap-x-2.5 gap-y-5 w-[306px] mx-auto custom-grid",
      },
      id: "select-pricae",
    })
  }

  const isOpenSheetOpen = () => {
    modalManager.open({
      Component: SingleSelectItemBottomSheet,
      componentProps: {
        title: "영업 여부",
        handleSubmit: handleSetFilter("isOpen"),
        defaultData: filters.isOpen,
        items: IsOpenFilterList,
        renderItem: SelectBadge,
        contentClassName: "flex flex-wrap gap-x-2.5 gap-y-5 w-[306px] mx-auto custom-grid",
      },
      id: "select-is-open",
    })
  }

  const calendarSheetOpen = () => {
    modalManager.open({
      Component: CalendarSelectBottomSheet,
      componentProps: {
        title: "날짜",
        handleSubmit: (startDate, endDate) => setFilters({ date: { startDate, endDate } }),
        contentClassName: "flex flex-wrap gap-x-2.5 gap-y-5 w-[306px] mx-auto",
        defaultStartDate: filters.date?.startDate,
        defaultEndDate: filters.date?.endDate,
      },
      id: "select-calendar",
    })
  }

  const formatArrayFilter = (props: { filter?: IdAndTitle[]; defaultTitle: string }) => {
    const { defaultTitle, filter } = props
    switch (filter?.length) {
      case undefined:
      case 0:
        return defaultTitle
      case 1:
        return filter[0].title
      default:
        return `${filter![0].title} +${filter!.length - 1}`
    }
  }

  const formatDate = (props: { startDate?: string; endDate?: string; defaultTitle: string }) => {
    const { defaultTitle, startDate, endDate } = props

    if (startDate && !endDate) {
      const startDayJs = dayjs(startDate)
      const today = dayjs()
      if (today.year() !== startDayJs.year()) {
        return startDayJs.format("YY.MM.DD")
      }
      return startDayJs.format("MM.DD")
    }

    if (startDate && endDate) {
      return formatDateRange(startDate, endDate)
    }

    return defaultTitle
  }

  return {
    filters,
    resetFilters,
    setFilters,
    formatArrayFilter,
    formatDate,
    openSheet: {
      genre: genreSheetOpen,
      price: priceSheetOpen,
      isOpen: isOpenSheetOpen,
      calendar: calendarSheetOpen,
      region: regionSheetOpen,
    },
  }
}

export default useClubFilters
