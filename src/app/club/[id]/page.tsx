import ClubDetailTemplate from "./_components/club-detail-template"
import ClubIntro from "./_components/club-intro"
import BottomNavigation from "@/src/common/components/layout/bottom-navigation"
import HeaderWithBackButton from "@/src/common/components/layout/header-with-back-button"

interface PageProps {
  params: Promise<{ id: string }>
}

const Page = async (props: PageProps) => {
  const { params } = props
  const { id } = await params
  console.log(`id`, id)
  return (
    <div className="relative mb-[var(--footer-nav-height)]">
      <HeaderWithBackButton title={"W클럽"} sticky />
      <ClubIntro />
      <div className="h-1 bg-gray-100" />
      <ClubDetailTemplate />
      <BottomNavigation />
    </div>
  )
}

export default Page
