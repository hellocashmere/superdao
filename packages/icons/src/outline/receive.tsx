import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface ReceiveIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function ReceiveIcon({ className, ref, ...props }: ReceiveIconProps) {
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
          d="M19.071 4.92896C19.4615 5.31949 19.4615 5.95265 19.071 6.34318L8.05018 17.364L16.9497 17.364C17.502 17.364 17.9497 17.8117 17.9497 18.364C17.9497 18.9163 17.502 19.364 16.9497 19.364L5.63596 19.364C5.08368 19.364 4.63596 18.9163 4.63596 18.364L4.63596 7.05028C4.63596 6.498 5.08368 6.05028 5.63596 6.05028C6.18825 6.05028 6.63596 6.498 6.63596 7.05028L6.63597 15.9498L17.6568 4.92896C18.0473 4.53844 18.6805 4.53844 19.071 4.92896Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
