import LogoHeader from "@/src/common/components/bar/logo-header"
import Footer from "@/src/common/components/footer/footer"
import HomeContentContainer from "@/src/domain/home/components/home-content-container"
import Popular from "@/src/domain/home/components/popular"

const Page = () => {
  return (
    <div>
      <LogoHeader />
      <div className="h-[130px] w-full bg-[#D9D9D9]" />
      <HomeContentContainer type="club">회원님을 위한 인기 클럽</HomeContentContainer>
      <HomeContentContainer type="event">Event</HomeContentContainer>
      <Popular />
      <Footer />
    </div>
  )
}

export default Page
