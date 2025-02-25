import { useSearchParams, useRouter } from "next/navigation"

function useSearchParamsFilter<T extends Record<string, any>>() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const filtersParam = searchParams.get("filters")
  const initialFilters: T = filtersParam ? JSON.parse(filtersParam) : ({} as T)

  const handleFilterChange = (newFilters: Partial<T>) => {
    const updatedFilters = { ...initialFilters, ...newFilters }

    const params = new URLSearchParams(searchParams.toString())
    params.set("filters", JSON.stringify(updatedFilters))

    router.push(`?${params.toString()}`)
  }

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("filters")

    router.push(`?${params.toString()}`)
  }

  return { filters: initialFilters, setFilters: handleFilterChange, resetFilters }
}

export default useSearchParamsFilter
