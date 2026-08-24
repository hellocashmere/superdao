import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface SortBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function SortBoldIcon({ className, ref, ...props }: SortBoldIconProps) {
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
          d="M6.11612 4.11612C6.60427 3.62796 7.39573 3.62796 7.88388 4.11612L11.8839 8.11612C12.372 8.60427 12.372 9.39573 11.8839 9.88388C11.3957 10.372 10.6043 10.372 10.1161 9.88388L8.25 8.01777V19C8.25 19.6904 7.69036 20.25 7 20.25C6.30964 20.25 5.75 19.6904 5.75 19V8.01777L3.88388 9.88388C3.39573 10.372 2.60427 10.372 2.11612 9.88388C1.62796 9.39573 1.62796 8.60427 2.11612 8.11612L6.11612 4.11612ZM17 3.75C17.6904 3.75 18.25 4.30964 18.25 5V15.9822L20.1161 14.1161C20.6043 13.628 21.3957 13.628 21.8839 14.1161C22.372 14.6043 22.372 15.3957 21.8839 15.8839L17.8839 19.8839C17.3957 20.372 16.6043 20.372 16.1161 19.8839L12.1161 15.8839C11.628 15.3957 11.628 14.6043 12.1161 14.1161C12.6043 13.628 13.3957 13.628 13.8839 14.1161L15.75 15.9822V5C15.75 4.30964 16.3096 3.75 17 3.75Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
