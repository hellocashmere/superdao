import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface MegaphoneBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function MegaphoneBoldIcon({
  className,
  ref,
  ...props
}: MegaphoneBoldIconProps) {
  return (
    <IconBase
      {...props}
      ref={ref}
      className={className}
    >
      <g>
        <path
          d="M16.328 4.29504L13.1674 6.27044C12.7331 6.54186 12.5159 6.67758 12.283 6.77361C12.0762 6.85886 11.8605 6.92071 11.64 6.95802C11.3916 7.00004 11.1355 7.00004 10.6234 7.00004H6C3.5 7.00004 2 9.00004 2 11C2 13 3.5 15 6 15V20C6 21.1046 6.89543 22 8 22C9.10457 22 10 21.1046 10 20V15H10.6234C11.1355 15 11.3916 15 11.64 15.0421C11.8605 15.0794 12.0762 15.1412 12.283 15.2265C12.5159 15.3225 12.7331 15.4582 13.1674 15.7297L16.328 17.705C17.5265 18.4541 18.1257 18.8286 18.6202 18.7888C19.0512 18.7542 19.4464 18.5352 19.7042 18.188C20 17.7898 20 17.0831 20 15.6699V6.33024C20 4.91696 20 4.21031 19.7042 3.81204C19.4464 3.46489 19.0512 3.24589 18.6202 3.21124C18.1257 3.17149 17.5265 3.546 16.328 4.29504Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
