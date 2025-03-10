import { cva } from "class-variance-authority"
import Link, { LinkProps } from "next/link"
import cn from "@/src/common/util/cn"

const badgeVariants = cva("rounded-full", {
  variants: {
    color: {
      primary: "bg-primary-300 text-white",
    },
    outlineColor: {
      gray: "border border-gray-400 bg-white text-black",
    },
    paddingSize: {
      default: "px-2.5 py-2",
    },
    activeColor: {
      default: "bg-primary-200 text-white border border-primary-500 text-primary-500",
    },
  },
})

type BadgeBaseProps = {
  color?: "primary"
  paddingSize?: "default"

  outline?: boolean
  outlineColor?: "gray"

  active?: boolean
  activeColor?: "default"

  className?: string
}

type DynamicProps<T extends React.ElementType> = {
  as?: T
} & Omit<React.ComponentPropsWithRef<T>, keyof BadgeBaseProps | "as">

type NextLinkBadgeProps = {
  as?: "next/link"
} & LinkProps

export type BadgeProps<T extends React.ElementType> = BadgeBaseProps &
  (DynamicProps<T> | NextLinkBadgeProps) & { children?: React.ReactNode }

const Badge = <T extends React.ElementType>(props: BadgeProps<T>) => {
  const {
    as,
    children,
    color,
    outline,
    outlineColor = "gray",
    className,
    paddingSize = "default",
    active,
    activeColor = "default",
    ...rest
  } = props

  const Component = as === "next/link" ? Link : (as ?? "button")
  return (
    <Component
      className={cn(
        badgeVariants({
          color,
          paddingSize,
          ...(outline && { outlineColor }),
          ...(active && { activeColor }),
        }),
        className,
      )}
      {...(rest as any)}
    >
      {children}
    </Component>
  )
}

export default Badge
