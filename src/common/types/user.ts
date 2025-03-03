export interface UserDataRequest {
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

export type User = {
  email: string
  name: string
  birthday: string
  gender: string
  phoneNumber: string
  accessToken: string
}

export interface AuthResponse {
  accessToken: string
  isSignup: boolean
  name: string
  phoneNumber: string
  birthday: string
  gender: string
  email: string
}
