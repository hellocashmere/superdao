import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface LikeBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function LikeBoldIcon({ className, ref, ...props }: LikeBoldIconProps) {
  return (
    <IconBase
      {...props}
      ref={ref}
      className={className}
    >
      <g>
        <path
          d="M13.0324 22.5927L13.0346 22.5916C14.1604 21.9856 16.7363 20.4762 19.0444 18.2119C21.3417 15.9582 23.5 12.83 23.5 9C23.5 5.62617 21.2153 2 17 2C14.8625 2 13.1687 3.10459 12 4.84818C10.8313 3.10459 9.13752 2 7 2C2.78474 2 0.5 5.62617 0.5 9C0.5 12.83 2.65829 15.9582 4.95563 18.2119C7.26515 20.4776 9.84284 21.9875 10.9676 22.5927L11.0031 22.612C11.1516 22.6926 11.3667 22.8094 11.6403 22.8641C11.8669 22.9094 12.1331 22.9094 12.3597 22.8641C12.6333 22.8094 12.8484 22.6926 12.9969 22.612L13.0324 22.5927Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
