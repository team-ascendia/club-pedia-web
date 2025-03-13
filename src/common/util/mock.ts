import { PaginationResponse } from "@/src/common/types/default-api.type"

type GenerateMockDataProps<T> = {
  pagination: Omit<PaginationResponse, "totalPages">
  resolver: (index: number) => T
}

export const generateListMockData = <T>(props: GenerateMockDataProps<T>) => {
  const { pagination, resolver } = props
  const { page, size, totalItems } = pagination

  const isRequestGreaterThanTotal = size * page > totalItems

  const length = isRequestGreaterThanTotal ? totalItems - (page - 1) * size : size

  const items = Array.from({ length }, (_, index) => resolver(index + (page - 1) * size))

  return {
    pagination: { ...pagination, totalPages: Math.ceil(totalItems / size) },
    items,
  }
}
