export interface ContainerProps {
  title: string
  movePath?: string
}

export interface ContentItemResponse {
  id?: number
  title: string
  thumbnailImageUrl: string
  address: string
}

export interface ContentListResponse {
  totalItems: number
  items: ContentItemResponse[]
}
