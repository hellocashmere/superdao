import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface ListenerIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function ListenerIcon({ className, ref, ...props }: ListenerIconProps) {
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
          d="M12 0.5C6.47715 0.5 2 4.97715 2 10.5V18.5C2 20.433 3.567 22 5.5 22H6.5C7.60457 22 8.5 21.1046 8.5 20V14.5C8.5 13.3954 7.60457 12.5 6.5 12.5H5.5C4.9632 12.5 4.45463 12.6208 4 12.8368V10.5C4 6.08172 7.58172 2.5 12 2.5C16.4183 2.5 20 6.08172 20 10.5V12.8368C19.5454 12.6208 19.0368 12.5 18.5 12.5H17.5C16.3954 12.5 15.5 13.3954 15.5 14.5V20C15.5 21.1046 16.3954 22 17.5 22H18.5C20.433 22 22 20.433 22 18.5V10.5C22 4.97715 17.5228 0.5 12 0.5ZM20 16C20 15.1716 19.3284 14.5 18.5 14.5H17.5V20H18.5C19.3284 20 20 19.3284 20 18.5V16ZM4 16V18.5C4 19.3284 4.67157 20 5.5 20H6.5V14.5H5.5C4.67157 14.5 4 15.1716 4 16Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
