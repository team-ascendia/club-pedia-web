import BottomNavigationItem from "./bottom-navigation-item"
import { CommentIcon, HomeIcon, LocationIcon, UserIcon } from "@/public/icons"

const NaviItems = [
  {
    label: "홈",
    path: "/",
    Icon: <HomeIcon />,
  },
  {
    label: "지도",
    path: "/map",
    Icon: <LocationIcon />,
  },
  {
    label: "커뮤니티",
    path: "/community",
    Icon: <CommentIcon />,
  },
  {
    label: "마이페이지",
    path: "/mypage",
    Icon: <UserIcon />,
  },
]

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 grid h-20 w-full grid-cols-4 place-items-center gap-x-6 bg-white px-[22px] shadow-[0px_0px_4px_0px_#BDBDBD] md:max-w-[390px]">
      {NaviItems.map(item => (
        <BottomNavigationItem key={item.label} {...item} />
      ))}
    </div>
  )
}

export default BottomNavigation
