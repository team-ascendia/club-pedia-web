"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { delay } from "msw"
import { useEffect } from "react"

const ClientComponent = () => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ["prefetch-test"],
    queryFn: async () => {
      await delay(3000)
      return { data: "test" }
    },
  })

  useEffect(() => {
    console.log(data)
  }, [])
  return (
    <div>
      ClientComponent <br />
      {data.data}
      <button onClick={() => refetch()}>refetch</button>
    </div>
  )
}

export default ClientComponent
