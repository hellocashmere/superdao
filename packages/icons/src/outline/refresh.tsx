import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface RefreshIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function RefreshIcon({ className, ref, ...props }: RefreshIconProps) {
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
          d="M20.5 1.25C21.0523 1.25 21.5 1.69772 21.5 2.25V8C21.5 8.55228 21.0523 9 20.5 9H20.0862C20.0722 9.0003 20.0582 9.00029 20.0443 9H15.25C14.6977 9 14.25 8.55228 14.25 8C14.25 7.44772 14.6977 7 15.25 7H18.2456C16.7787 5.17005 14.5254 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C15.806 20 18.9934 17.3412 19.8018 13.7787C19.924 13.2401 20.4597 12.9026 20.9983 13.0248C21.5369 13.147 21.8744 13.6827 21.7522 14.2213C20.7416 18.6747 16.7603 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C14.9877 2 17.6683 3.31034 19.5 5.38568V2.25C19.5 1.69772 19.9477 1.25 20.5 1.25Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
