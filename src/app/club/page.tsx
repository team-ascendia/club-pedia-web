import { QueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { Suspense } from "react"
import ClubFilterList from "./_components/club-filter-list"
import ClubList from "./_components/club-list"
import { ClubPediaErrorBoundary } from "@/src/common/components/error-boundary/club-pedia-error-boundray"
import DefaultErrorBoundaryFallback from "@/src/common/components/error-boundary/default-error-boundary-fallback"
import BottomNavigation from "@/src/common/components/layout/bottom-navigation"
import HeaderWithBackButton from "@/src/common/components/layout/header-with-back-button"
import { DEFAULT_QUERY_STALE_TIME } from "@/src/common/util/tanstack-query/get-query-client"
import PrefetchBoundary from "@/src/common/util/tanstack-query/prefetch-suspense"
import clubApi from "@/src/domain/club/api"
import BoxSkeleton from "@/src/domain/club/components/box-skeleton"
import { ClubListSearchParams } from "@/src/domain/club/type"

interface ClubPageParams {
  searchParams: Promise<ClubListSearchParams>
}

const ClubPage = async ({ searchParams }: ClubPageParams) => {
  const searchParamsResult = await searchParams
  const timeStamp = dayjs().format("YYYY-MM-DDTHH:mm:ss")

  const clubPrefetch = async (qc: QueryClient) => {
    await qc.prefetchInfiniteQuery({
      queryKey: ["club", "list", searchParamsResult, timeStamp],
      queryFn: ({ pageParam }) =>
        clubApi.getClubList({ ...searchParamsResult, page: pageParam, pageSize: 10, requestTime: timeStamp }),
      initialPageParam: 1,
      staleTime: DEFAULT_QUERY_STALE_TIME,
      gcTime: DEFAULT_QUERY_STALE_TIME,
    })
  }

  return (
    <div className="relative mb-[var(--footer-nav-height)]">
      <HeaderWithBackButton title="클럽" sticky />
      <Suspense>
        <div className="scrollbar-hide sticky top-[var(--header-height)] z-[1] box-border flex h-12 gap-2.5 overflow-x-scroll bg-white px-6 py-2">
          <ClubFilterList />
        </div>
      </Suspense>
      <Suspense fallback={<BoxSkeleton />}>
        <PrefetchBoundary prefetchList={[clubPrefetch]}>
          <ClubPediaErrorBoundary fallback={DefaultErrorBoundaryFallback}>
            <ClubList requestTime={timeStamp} />
          </ClubPediaErrorBoundary>
        </PrefetchBoundary>
      </Suspense>
      <BottomNavigation />
    </div>
  )
}

export default ClubPage
