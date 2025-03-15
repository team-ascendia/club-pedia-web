"use client"

import { useInfiniteScroll } from "@/src/common/hooks/use-infinite-scroll"

interface InfiniteScrollListProps<T> {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  isLoading: boolean
  fetchNextPage: () => void
  data?: T[]
  render: (data: T) => React.JSX.Element
  layoutClassName?: string
  error: Error | null

  fallback?: React.JSX.Element
  errorFallback?: React.JSX.Element
}

const InfiniteScrollList = <_, T>(props: InfiniteScrollListProps<T>) => {
  const {
    data,
    fetchNextPage,
    errorFallback,
    hasNextPage,
    isFetchingNextPage,
    render,
    layoutClassName,
    fallback,
    error,
    isLoading,
  } = props
  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  })

  return (
    <div className={layoutClassName}>
      {data?.map(render)}
      {(isFetchingNextPage || isLoading) && fallback}
      {error && errorFallback}
      <div ref={loadMoreRef} className={`${error || isFetchingNextPage ? "hidden" : ""}`} />
    </div>
  )
}

export default InfiniteScrollList
