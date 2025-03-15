import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { PropsWithChildren } from "react"
import { getQueryClient } from "./get-query-client"

interface PrefetchSuspenseProps extends PropsWithChildren {
  prefetchList: Array<(client: QueryClient) => Promise<void>>
}

const PrefetchBoundary = async (props: PrefetchSuspenseProps) => {
  const { children, prefetchList } = props

  const qc = getQueryClient()

  await Promise.allSettled(prefetchList.map(prefetch => prefetch(qc)))

  const dehydratedState = dehydrate(qc)
  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
}

export default PrefetchBoundary
