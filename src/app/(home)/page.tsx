import LogoHeader from "@/src/common/components/bar/logo-header"
import Footer from "@/src/common/components/footer/footer"
import ContentContainer from "@/src/domain/home/components/content-container"
import Popular from "@/src/domain/home/components/popular"

const Page = () => {
  return (
    <div>
      <LogoHeader />
      <div className="h-[130px] w-full bg-[#D9D9D9]" />
      <ContentContainer title={"회원님을 위한 인기 클럽"} />
      <ContentContainer title={"Event"} />
      <Popular />
      <Footer />
    </div>
  )
}

export default Page
