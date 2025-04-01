import { DefaultListParams } from "@/src/common/types/default-api.type"
import { IdAndTitle } from "@/src/common/util/types/default"

export type ClubResponse = {
  id: number
  title: string
  thumbnailImageUrl?: string
  address: string
  isOpen: boolean
  summary: string
  price: number
  region: IdAndTitle
  genres: IdAndTitle[]
}

export type ClubListSearchParams = {
  genres: string
  regions: string
  priceStart: string
  priceEnd: string
  isOpen: string
}

export interface ClubListRequestParams extends ClubListSearchParams, DefaultListParams {
  requestTime: string
}

interface PriceFileter extends IdAndTitle {
  priceStart?: number
  priceEnd?: number
}

interface IsOpenFilter extends IdAndTitle {
  isOpen?: boolean
}

interface DateFilter {
  startDate?: string
  endDate?: string
}

export type ClubFilters = {
  genres?: IdAndTitle[]
  regions?: IdAndTitle[]
  price?: PriceFileter
  isOpen: IsOpenFilter
  date: DateFilter
}

export type ReviewResponse = {
  id: number
}
