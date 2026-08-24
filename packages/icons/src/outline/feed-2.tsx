import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface Feed2IconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function Feed2Icon({ className, ref, ...props }: Feed2IconProps) {
  return (
    <IconBase
      {...props}
      ref={ref}
      className={className}
    >
      <g>
        <g>
          <rect
            x="4"
            y="2.5"
            width="16"
            height="19"
            rx="3"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="8"
            y1="6"
            x2="12"
            y2="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="5"
            y1="9.5"
            x2="19"
            y2="9.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 5.5C3 3.29086 4.79086 1.5 7 1.5H17C19.2091 1.5 21 3.29086 21 5.5V18.5C21 20.7091 19.2091 22.5 17 22.5H7C4.79086 22.5 3 20.7091 3 18.5V5.5ZM7 3.5C5.89543 3.5 5 4.39543 5 5.5V8.5H19V5.5C19 4.39543 18.1046 3.5 17 3.5H7ZM19 10.5H5V18.5C5 19.6046 5.89543 20.5 7 20.5H17C18.1046 20.5 19 19.6046 19 18.5V10.5ZM7 6C7 5.44772 7.44772 5 8 5H12C12.5523 5 13 5.44772 13 6C13 6.55228 12.5523 7 12 7H8C7.44772 7 7 6.55228 7 6Z"
            fill="currentColor"
          />
        </g>
        <g>
          <path
            d="M7 6C7 5.44772 7.44772 5 8 5H12C12.5523 5 13 5.44772 13 6C13 6.55228 12.5523 7 12 7H8C7.44772 7 7 6.55228 7 6Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 5.5C3 3.29086 4.79086 1.5 7 1.5H17C19.2091 1.5 21 3.29086 21 5.5V18.5C21 20.7091 19.2091 22.5 17 22.5H7C4.79086 22.5 3 20.7091 3 18.5V5.5ZM7 3.5C5.89543 3.5 5 4.39543 5 5.5V8.5H19V5.5C19 4.39543 18.1046 3.5 17 3.5H7ZM19 10.5H5V18.5C5 19.6046 5.89543 20.5 7 20.5H17C18.1046 20.5 19 19.6046 19 18.5V10.5Z"
            fill="currentColor"
          />
        </g>
      </g>
    </IconBase>
  )
}
