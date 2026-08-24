import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface TransactionBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function TransactionBoldIcon({
  className,
  ref,
  ...props
}: TransactionBoldIconProps) {
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
          d="M19.8839 6.11612C20.372 6.60427 20.372 7.39573 19.8839 7.88388L15.8839 11.8839C15.3957 12.372 14.6043 12.372 14.1161 11.8839C13.628 11.3957 13.628 10.6043 14.1161 10.1161L15.9822 8.25L5 8.25C4.30964 8.25 3.75 7.69036 3.75 7C3.75 6.30964 4.30964 5.75 5 5.75L15.9822 5.75L14.1161 3.88388C13.628 3.39573 13.628 2.60427 14.1161 2.11612C14.6043 1.62796 15.3957 1.62796 15.8839 2.11612L19.8839 6.11612ZM20.25 17C20.25 17.6904 19.6904 18.25 19 18.25L8.01777 18.25L9.88388 20.1161C10.372 20.6043 10.372 21.3957 9.88388 21.8839C9.39573 22.372 8.60427 22.372 8.11612 21.8839L4.11611 17.8839C3.62796 17.3957 3.62796 16.6043 4.11611 16.1161L8.11612 12.1161C8.60427 11.628 9.39573 11.628 9.88388 12.1161C10.372 12.6043 10.372 13.3957 9.88388 13.8839L8.01777 15.75L19 15.75C19.6904 15.75 20.25 16.3096 20.25 17Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
