import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface FullScreenIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function FullScreenIcon({
  className,
  ref,
  ...props
}: FullScreenIconProps) {
  return (
    <IconBase
      {...props}
      ref={ref}
      className={className}
    >
      <g>
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.5 3.5C14.5 2.94772 14.9477 2.5 15.5 2.5H20.5C21.0523 2.5 21.5 2.94772 21.5 3.5V8.5C21.5 9.05228 21.0523 9.5 20.5 9.5C19.9477 9.5 19.5 9.05228 19.5 8.5V5.91421L15.2071 10.2071C14.8166 10.5976 14.1834 10.5976 13.7929 10.2071C13.4024 9.81658 13.4024 9.18342 13.7929 8.79289L18.0858 4.5H15.5C14.9477 4.5 14.5 4.05228 14.5 3.5Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.79289 13.7929C9.18342 13.4024 9.81658 13.4024 10.2071 13.7929C10.5976 14.1834 10.5976 14.8166 10.2071 15.2071L5.91421 19.5H8.5C9.05228 19.5 9.5 19.9477 9.5 20.5C9.5 21.0523 9.05228 21.5 8.5 21.5H3.5C2.94772 21.5 2.5 21.0523 2.5 20.5V15.5C2.5 14.9477 2.94772 14.5 3.5 14.5C4.05228 14.5 4.5 14.9477 4.5 15.5V18.0858L8.79289 13.7929Z"
            fill="currentColor"
          />
        </g>
      </g>
    </IconBase>
  )
}
