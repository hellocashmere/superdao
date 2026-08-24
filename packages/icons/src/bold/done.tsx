import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface DoneBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function DoneBoldIcon({ className, ref, ...props }: DoneBoldIconProps) {
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
          d="M21.3697 4.4057C21.974 4.97229 22.0047 5.92155 21.4381 6.52592L9.25056 19.5259C8.96699 19.8284 8.57087 20 8.15625 20C7.74164 20 7.34552 19.8284 7.06195 19.5259L1.9057 14.0259C1.3391 13.4215 1.36972 12.4723 1.97409 11.9057C2.57846 11.3391 3.52772 11.3697 4.09431 11.9741L8.15625 16.3068L19.2494 4.47409C19.816 3.86972 20.7653 3.8391 21.3697 4.4057Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
