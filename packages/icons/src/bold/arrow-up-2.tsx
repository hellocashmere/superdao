import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface ArrowUp2BoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function ArrowUp2BoldIcon({
  className,
  ref,
  ...props
}: ArrowUp2BoldIconProps) {
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
          d="M12 20.75C11.3096 20.75 10.75 20.1904 10.75 19.5L10.75 7.51777L5.88388 12.3839C5.39573 12.872 4.60427 12.872 4.11612 12.3839C3.62796 11.8957 3.62796 11.1043 4.11612 10.6161L11.1161 3.61612C11.6043 3.12796 12.3957 3.12796 12.8839 3.61612L19.8839 10.6161C20.372 11.1043 20.372 11.8957 19.8839 12.3839C19.3957 12.872 18.6043 12.872 18.1161 12.3839L13.25 7.51777L13.25 19.5C13.25 20.1904 12.6904 20.75 12 20.75Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
