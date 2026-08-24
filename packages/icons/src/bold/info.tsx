import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface InfoBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function InfoBoldIcon({ className, ref, ...props }: InfoBoldIconProps) {
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
          d="M22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V12ZM12 9C12.8284 9 13.5 8.32843 13.5 7.5C13.5 6.67157 12.8284 6 12 6C11.1716 6 10.5 6.67157 10.5 7.5C10.5 8.32843 11.1716 9 12 9Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
