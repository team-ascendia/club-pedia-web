export interface PaginationResponse {
  page: number
  size: number
  totalPages: number
  totalItems: number
}

export interface DefaultListResponse<T> {
  pagination: PaginationResponse
  items: T[]
}

export interface DefaultErrorResponse<T> {
  error: {
    type: string
    message: string
    details: T
  }
}
