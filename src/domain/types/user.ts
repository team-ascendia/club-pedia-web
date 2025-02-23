export interface IUserData {
  name: string
  phoneNumber: string
  birthday: string
  gender: string
  isOver14Agreed: boolean
  isServiceTermAgreed: boolean
  isPrivacyPolicyAgreed: boolean
  isLocationTermAgreed: boolean
  isMarketingAgreed: boolean
}

export type TUser = {
  email: string
  name: string
  birthday: string
  gender: string
  phoneNumber: string
  accessToken: string
}
