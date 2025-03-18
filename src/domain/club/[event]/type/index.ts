import { DefaultListParams } from "@/src/common/types/default-api.type"
import { IdAndTitle } from "@/src/common/util/types/default"

export type EventResponse = {
  id: number
  title: string
  thumbnailImageUrl?: string
  startDate: string
  endDate: string
  summary: string
  club: IdAndTitle
  region: IdAndTitle
  genres: IdAndTitle[]
}

export type EventListSearchParams = {
  genre: string
  region: string
  priceStart: string
  priceEnd: string
  startData: string
  endDate: string
}

export type EventListRequestParams = EventListSearchParams & DefaultListParams
