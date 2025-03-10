import { useLayoutEffect, useRef } from "react"

interface UseInfiniteScrollProps {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

export const useInfiniteScroll = ({ hasNextPage, isFetchingNextPage, fetchNextPage }: UseInfiniteScrollProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const observerCallback = ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }

    // observer 생성
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "100px",
    })

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return loadMoreRef
}
