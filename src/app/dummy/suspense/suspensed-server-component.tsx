import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { headers } from "next/headers"
import { userAgent } from "next/server"
import ClientComponent from "./client-component"
import { delay } from "@/src/common/util/delay"
import { getQueryClient } from "@/src/common/util/tanstack-query/get-query-client"

const SuspensedServerComponent = async () => {
  const requestHeaders = await headers()
  const { isBot } = userAgent({ headers: requestHeaders })
  const qc = getQueryClient()

  await qc.prefetchQuery({
    queryKey: ["prefetch-test"],
    queryFn: async () => {
      await delay(3000)
      return {
        data: "prefetched Data",
      }
    },
  })
  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <div className="py-10">
        SuspensedServerComponent
        <ClientComponent />
      </div>
    </HydrationBoundary>
  )
}

export const SuspensedServerComponent2 = async () => {
  await delay(4000)

  return <div>2번째 컴포넌트</div>
}

export default SuspensedServerComponent
