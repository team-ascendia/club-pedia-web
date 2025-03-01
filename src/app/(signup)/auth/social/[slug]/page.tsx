import SocialLogin from "@/src/domain/sign/external/oauth/social-login"

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const validSocialTypes = ["google", "kakao", "naver"]
  const slug = (await params).slug

  if (!slug || !validSocialTypes.includes(slug)) {
    return <div>잘못된 접근입니다.</div>
  }

  return <SocialLogin socialType={slug} />
}
