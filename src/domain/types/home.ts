export interface ContainerProps {
  title: string
  movePath?: string
}

export interface Member {
  nickname: string
}

export interface Club {
  title: string
}

export interface Region {
  title: string
}

export interface ContentItemResponse {
  id?: number
  thumbnailImageUrl: string
  title?: string
  region: Region
  club?: Club
}

export interface PostResponse {
  id?: number
  title: string
  thumbnailImageUrl: string
  content: string
  visitCount: number
  likeCount: number
  commentCount: number
  member: Member
  createdAt: string
}

export interface ContentListResponse {
  items: ContentItemResponse[]
}

export interface PostListResponse {
  items: PostResponse[]
}
