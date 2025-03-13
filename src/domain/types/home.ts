export interface ContainerProps {
  title: string
  movePath?: string
}

export interface Member {
  nickname: string
}

export interface ContentItemResponse {
  id?: number
  title: string
  thumbnailImageUrl: string
  address: string
}

export interface PostResponse {
  id?: number
  title: string
  thumbnailImageUrl: string
  address: string
  content: string
  visitCount: number
  likeCount: number
  commentCount: number
  member: Member
  created: string
}

export interface ContentListResponse {
  items: ContentItemResponse[]
}

export interface PostListResponse {
  items: PostResponse[]
}
