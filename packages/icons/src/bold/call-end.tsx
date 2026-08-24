import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface CallEndBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function CallEndBoldIcon({
  className,
  ref,
  ...props
}: CallEndBoldIconProps) {
  return (
    <IconBase
      {...props}
      ref={ref}
      className={className}
    >
      <g>
        <path
          d="M12 6.5C2.5 6.5 0.5 10.5 0.5 14.5C0.5 15.6046 1.39543 16.5 2.5 16.5H5.24928C6.76846 16.5 8 15.2685 8 13.7493C8 12.9347 8.24449 12.1092 8.95175 11.7051C9.58074 11.3456 10.56 11 12 11C13.44 11 14.4193 11.3456 15.0483 11.7051C15.7555 12.1092 16 12.9347 16 13.7493C16 15.2685 17.2315 16.5 18.7507 16.5H21.5C22.6046 16.5 23.5 15.6046 23.5 14.5C23.5 10.5 21.5 6.5 12 6.5Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
