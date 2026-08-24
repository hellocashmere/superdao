import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface DragIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function DragIcon({ className, ref, ...props }: DragIconProps) {
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
          d="M2 9C2 8.44772 2.44772 8 3 8H21C21.5523 8 22 8.44772 22 9C22 9.55228 21.5523 10 21 10H3C2.44772 10 2 9.55228 2 9ZM2 15C2 14.4477 2.44772 14 3 14H21C21.5523 14 22 14.4477 22 15C22 15.5523 21.5523 16 21 16H3C2.44772 16 2 15.5523 2 15Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
