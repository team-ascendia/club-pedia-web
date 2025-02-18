type TermItem = {
  title: string
  term: string
  required: boolean
  name: string
}

export const TermList: TermItem[] = [
  {
    title: "서비스 이용 약관",
    required: true,
    term: "",
    name: "isServiceTermAgreed",
  },
  {
    title: "만 14세 이상 동의",
    required: true,
    term: "",
    name: "isOver14Agreed",
  },
  {
    title: "개인정보 수집 및 이용 동의",
    required: true,
    term: "",
    name: "isPrivacyPolicyAgreed",
  },
  {
    title: "위치기반서비스 이용약관 동의",
    required: true,
    term: "",
    name: "isLocationTermAgreed",
  },
  {
    title: "마케팅 정보 수신 및 이용 동의",
    required: false,
    term: "",
    name: "isMarketingAgreed",
  },
]

export const defaultTermState = TermList.reduce(
  (acc, { name }) => ({ ...acc, [name]: false }),
  {} as Record<string, boolean>,
)
