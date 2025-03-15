import ClubInfo from "./_components/club-info"
import { ClubPediaErrorBoundary } from "@/src/common/components/error-boundary/club-pedia-error-boundray"
import DefaultErrorBoundaryFallback from "@/src/common/components/error-boundary/default-error-boundary-fallback"
import BottomNavigation from "@/src/common/components/layout/bottom-navigation"
import HeaderWithBackButton from "@/src/common/components/layout/header-with-back-button"
import PrefetchBoundary from "@/src/common/util/tanstack-query/prefetch-suspense"

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
      <PrefetchBoundary prefetchList={[]}>
        <ClubPediaErrorBoundary fallback={DefaultErrorBoundaryFallback}>
          <ClubInfo />
        </ClubPediaErrorBoundary>
      </PrefetchBoundary>
      <BottomNavigation />
    </div>
  )
}

export default Page
