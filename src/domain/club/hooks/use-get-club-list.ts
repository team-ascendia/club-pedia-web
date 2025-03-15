import { QueryKey, useInfiniteQuery } from "@tanstack/react-query"
import { DEFAULT_QUERY_STALE_TIME } from "@/src/common/util/tanstack-query/get-query-client"
import clubApi from "@/src/domain/club/api"
import { ClubListSearchParams } from "@/src/domain/club/type"

type UseGetClubListProps = {
  queryKey: QueryKey
  params: ClubListSearchParams
  requestTime: string
}

const useGetClubList = (props: UseGetClubListProps) => {
  const { queryKey, params, requestTime } = props

  const queryResult = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => clubApi.getClubList({ ...params, page: pageParam, pageSize: 10, requestTime }),
    getNextPageParam: lastPage => {
      if (lastPage.pagination.totalPages <= lastPage.pagination.page) {
        return undefined
      }
      return lastPage.pagination.page + 1
    },
    initialPageParam: 1,
    staleTime: DEFAULT_QUERY_STALE_TIME,
    gcTime: DEFAULT_QUERY_STALE_TIME,
  })

  const { data } = queryResult

  const flatData = data?.pages.flatMap(page => page.items)

  return { ...queryResult, data: flatData }
}

export default useGetClubList
