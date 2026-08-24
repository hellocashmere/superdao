import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface KeynoteIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function KeynoteIcon({ className, ref, ...props }: KeynoteIconProps) {
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
          d="M1 3C1 2.44772 1.44772 2 2 2H22C22.5523 2 23 2.44772 23 3C23 3.55228 22.5523 4 22 4H21V15H22C22.5523 15 23 15.4477 23 16C23 16.5523 22.5523 17 22 17H13V21H16C16.5523 21 17 21.4477 17 22C17 22.5523 16.5523 23 16 23H8C7.44772 23 7 22.5523 7 22C7 21.4477 7.44772 21 8 21H11V17H2C1.44772 17 1 16.5523 1 16C1 15.4477 1.44772 15 2 15H3V4H2C1.44772 4 1 3.55228 1 3ZM5 4V15H19V4H5Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
