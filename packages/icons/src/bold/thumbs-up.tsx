import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface ThumbsUpBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function ThumbsUpBoldIcon({
  className,
  ref,
  ...props
}: ThumbsUpBoldIconProps) {
  return (
    <IconBase
      {...props}
      ref={ref}
      className={className}
    >
      <g>
        <path
          d="M18.45 9.75005C18 9.25005 17.4 9.00005 16.75 9.00005H12.15C12.05 9.00005 12 8.95005 11.95 8.90005C11.9 8.80005 11.9 8.70005 11.95 8.60005C12.35 7.70005 12.6 6.90005 12.8 5.90005C12.95 5.35005 13 5.00005 13 4.65005C13 3.20005 11.9 2.65005 11.35 2.55005C11.25 2.55005 11.15 2.55005 11.1 2.65005C11.05 2.70005 7.9 7.25005 6.65 8.50005C5.6 9.50005 5 10.75 5 12V15.3C5 18.15 7.35 20.5 10.25 20.5H14.9C16.55 20.5 17.9 19.3 18.15 17.65L19 11.55C19.1 10.9 18.9 10.25 18.45 9.75005Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
