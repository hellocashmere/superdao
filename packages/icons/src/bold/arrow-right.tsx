import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface ArrowRightBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function ArrowRightBoldIcon({
  className,
  ref,
  ...props
}: ArrowRightBoldIconProps) {
  return (
    <IconBase
      {...props}
      ref={ref}
      className={className}
    >
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.25 12C3.25 11.3096 3.80964 10.75 4.5 10.75H16.4822L11.6161 5.88388C11.128 5.39573 11.128 4.60427 11.6161 4.11612C12.1043 3.62796 12.8957 3.62796 13.3839 4.11612L20.3839 11.1161C20.872 11.6043 20.872 12.3957 20.3839 12.8839L13.3839 19.8839C12.8957 20.372 12.1043 20.372 11.6161 19.8839C11.128 19.3957 11.128 18.6043 11.6161 18.1161L16.4822 13.25L4.5 13.25C3.80964 13.25 3.25 12.6904 3.25 12Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
