interface IKakaoProps {
  redirectUri?: string
}

const Kakao = (props: IKakaoProps) => {
  const { redirectUri } = props
  const JAVASCRIPT_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
  const scope = "account_email"

  if (JAVASCRIPT_KEY && !window.Kakao.isInitialized()) {
    window.Kakao.init(JAVASCRIPT_KEY)
  }

  window.Kakao.Auth.authorize({
    scope,
    redirectUri: redirectUri,
  })
}

export default Kakao
