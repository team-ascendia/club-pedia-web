"use client"

import ClubListErrorRetryUi from "./club-list-error-retry"
import InfiniteScrollList from "@/src/common/components/list/infinite-scroll-list"
import useFilter from "@/src/common/hooks/use-filter"
import BoxSkeleton from "@/src/domain/club/components/box-skeleton"
import ClubBox from "@/src/domain/club/components/club-box"
import useGetClubList from "@/src/domain/club/hooks/use-get-club-list"
import { ClubListSearchParams } from "@/src/domain/club/type"

interface ClubListProps {
  requestTime: string
}

const ClubList = (props: ClubListProps) => {
  const { requestTime } = props
  const { allSearchParams } = useFilter()
  const clubListQuery = useGetClubList({
    queryKey: ["club", "list", allSearchParams, requestTime],
    params: allSearchParams as ClubListSearchParams,
    requestTime,
  })

  const { fetchNextPage } = clubListQuery

  return (
    <InfiniteScrollList
      {...clubListQuery}
      render={data => (
        <div key={data.id} className="border-b border-gray-300 px-6 py-4">
          <ClubBox club={data} />
        </div>
      )}
      fallback={<BoxSkeleton />}
      errorFallback={<ClubListErrorRetryUi error={clubListQuery.error} retry={fetchNextPage} />}
    />
  )
}

export default ClubList
