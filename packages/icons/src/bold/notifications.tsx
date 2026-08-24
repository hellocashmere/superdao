import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface NotificationsBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function NotificationsBoldIcon({
  className,
  ref,
  ...props
}: NotificationsBoldIconProps) {
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
          d="M4.00005 8.00074C4.00005 3.58259 7.58164 -2.50339e-06 12.0001 0C16.4185 2.5034e-06 20.0001 3.5826 20.0001 8.00074V10.8268L21.38 14.6906C21.53 15.1107 21.6611 15.4776 21.7452 15.7841C21.8321 16.1012 21.9004 16.458 21.8487 16.8375C21.7389 17.6431 21.2443 18.345 20.5226 18.7193C20.1825 18.8956 19.8235 18.9514 19.4957 18.9761C19.1788 19 18.7892 19 18.3432 19L16 19C16 21.2091 14.2092 23 12 23C9.79091 23 8.00005 21.2091 8.00005 19L5.65697 19C5.21096 19 4.82134 19 4.50437 18.9761C4.17657 18.9514 3.81756 18.8956 3.47754 18.7193C2.75584 18.345 2.26122 17.6431 2.15145 16.8375C2.09973 16.458 2.16798 16.1012 2.25494 15.7841C2.33901 15.4776 2.47006 15.1107 2.62008 14.6907L4.00005 10.8268V8.00074ZM10 19C10 20.1046 10.8955 21 12 21C13.1046 21 14 20.1046 14 19H10Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
