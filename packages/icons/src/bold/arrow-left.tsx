import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface ArrowLeftBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function ArrowLeftBoldIcon({
  className,
  ref,
  ...props
}: ArrowLeftBoldIconProps) {
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
          d="M20.75 12C20.75 12.6904 20.1904 13.25 19.5 13.25H7.51777L12.3839 18.1161C12.872 18.6043 12.872 19.3957 12.3839 19.8839C11.8957 20.372 11.1043 20.372 10.6161 19.8839L3.61612 12.8839C3.12796 12.3957 3.12796 11.6043 3.61612 11.1161L10.6161 4.11612C11.1043 3.62796 11.8957 3.62796 12.3839 4.11612C12.872 4.60427 12.872 5.39573 12.3839 5.88388L7.51777 10.75L19.5 10.75C20.1904 10.75 20.75 11.3096 20.75 12Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
