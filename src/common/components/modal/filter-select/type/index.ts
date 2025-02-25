export type FilterRequiredProps = {
  id: number
  title: string
}

export type RenderItemProps<T> = {
  active: boolean
  item: T
}
