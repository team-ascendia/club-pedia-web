"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import cn from "@/src/common/util/cn"

interface BottomNavigationItemProps {
  label: string
  path: string
  Icon: React.JSX.Element
}

const BottomNavigationItem = (props: BottomNavigationItemProps) => {
  const { label, path, Icon } = props
  const currentPath = usePathname()

  const isActive = path === "/" ? currentPath === "/" : currentPath.startsWith(path)

  return (
    <Link href={path} className="flex w-full flex-col items-center justify-center gap-1">
      <span
        className={cn("[&>svg]:size-6 text-gray-400", {
          "text-primary-400": isActive,
        })}
      >
        {Icon}
      </span>
      <p
        className={cn("text-body6 text-gray-400", {
          "text-primary-400": isActive,
        })}
      >
        {label}
      </p>
    </Link>
  )
}

export default BottomNavigationItem
