import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface ArrowDownBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function ArrowDownBoldIcon({
  className,
  ref,
  ...props
}: ArrowDownBoldIconProps) {
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
          d="M12 3.25C12.6904 3.25 13.25 3.80964 13.25 4.5V16.4822L18.1161 11.6161C18.6043 11.128 19.3957 11.128 19.8839 11.6161C20.372 12.1043 20.372 12.8957 19.8839 13.3839L12.8839 20.3839C12.3957 20.872 11.6043 20.872 11.1161 20.3839L4.11612 13.3839C3.62796 12.8957 3.62796 12.1043 4.11612 11.6161C4.60427 11.128 5.39573 11.128 5.88388 11.6161L10.75 16.4822V4.5C10.75 3.80964 11.3096 3.25 12 3.25Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
