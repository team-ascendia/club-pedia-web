import { ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"
import { Config } from "tailwindcss"
import resolveConfig from "tailwindcss/resolveConfig"
import config from "@/tailwind.config"

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-title1",
        "text-title2",
        "text-title3",
        "text-title4",
        "text-title5",
        "text-title6",
        "text-body1",
        "text-body2",
        "text-body3",
        "text-body4",
        "text-body5",
        "text-body6",
        "text-body7",
      ],
      rounded: [
        {
          rounded: Object.keys(resolveConfig(config as Config).theme.spacing),
        },
      ],
    },
  },
})

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export default cn
