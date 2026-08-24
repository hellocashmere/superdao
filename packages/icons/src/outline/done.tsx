import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface DoneIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function DoneIcon({ className, ref, ...props }: DoneIconProps) {
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
          d="M20.2955 5.5795C20.7348 6.01884 20.7348 6.73116 20.2955 7.1705L9.7955 17.6705C9.35616 18.1098 8.64384 18.1098 8.2045 17.6705L3.7045 13.1705C3.26517 12.7312 3.26517 12.0188 3.7045 11.5795C4.14384 11.1402 4.85616 11.1402 5.2955 11.5795L9 15.284L18.7045 5.5795C19.1438 5.14017 19.8562 5.14017 20.2955 5.5795Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
