import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface RefreshBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function RefreshBoldIcon({
  className,
  ref,
  ...props
}: RefreshBoldIconProps) {
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
          d="M20.5 1C21.1904 1 21.75 1.55964 21.75 2.25V8C21.75 8.69036 21.1904 9.25 20.5 9.25H20.0917C20.0742 9.25037 20.0567 9.25037 20.0392 9.25H15.25C14.5596 9.25 14 8.69036 14 8C14 7.30964 14.5596 6.75 15.25 6.75H17.7012C16.2842 5.21195 14.2538 4.25 12 4.25C7.71979 4.25 4.25 7.71979 4.25 12C4.25 16.2802 7.71979 19.75 12 19.75C15.6867 19.75 18.7749 17.1745 19.558 13.7234C19.7107 13.0502 20.3804 12.6282 21.0536 12.781C21.7268 12.9338 22.1488 13.6034 21.996 14.2766C20.9602 18.8414 16.8796 22.25 12 22.25C6.33908 22.25 1.75 17.6609 1.75 12C1.75 6.33908 6.33908 1.75 12 1.75C14.8326 1.75 17.3957 2.8991 19.25 4.75459V2.25C19.25 1.55964 19.8096 1 20.5 1Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
