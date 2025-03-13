export type FilterRequiredProps = {
  id: number
  title: string
}

interface GetFilterTitleByIdBaseProps {
  filter: FilterRequiredProps[]
  whenEmptyText?: string
}

export interface GetFilterTitleByIdSingleProps extends GetFilterTitleByIdBaseProps {
  id?: number
}

export interface GetFilterTitleByIdMultipleProps extends GetFilterTitleByIdBaseProps {
  id?: number[]
  converter?: (titles: string[]) => string
}

// 두 가지 경우를 합친 타입
export type GetFilterTitleByIdProps = GetFilterTitleByIdSingleProps | GetFilterTitleByIdMultipleProps
