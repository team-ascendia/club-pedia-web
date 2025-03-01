"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { PropsWithChildren } from "react"
import { ModalProvider } from "@/src/common/module/modal-manager"
import { getQueryClient } from "@/src/common/util/tanstack-query/get-query-client"

const RootProvider = (props: PropsWithChildren) => {
  const { children } = props
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ModalProvider />
      {children}
    </QueryClientProvider>
  )
}
export default RootProvider
