import { QueryKey, useSuspenseInfiniteQuery } from "@tanstack/react-query"
import eventApi from "@/src/domain/club/[event]/api"
import { EventListSearchParams } from "@/src/domain/club/[event]/type"

type UseGetEventListProps = {
  queryKey: QueryKey
  params: EventListSearchParams
}

const useGetEventList = (props: UseGetEventListProps) => {
  const { params, queryKey } = props

  const queryResult = useSuspenseInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => eventApi.getEventList({ ...params, page: pageParam, pageSize: 10 }),
    getNextPageParam: lastPage => {
      if (lastPage.pagination.totalPages <= lastPage.pagination.page) {
        return undefined
      }
      return lastPage.pagination.page + 1
    },
    initialPageParam: 1,
  })

  const { data } = queryResult

  const flatData = data.pages.flatMap(page => page.items)

  return { ...queryResult, data: flatData }
}

export default useGetEventList
