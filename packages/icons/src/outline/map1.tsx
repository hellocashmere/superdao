import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface Map1IconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function Map1Icon({ className, ref, ...props }: Map1IconProps) {
  return (
    <IconBase
      {...props}
      ref={ref}
      className={className}
    >
      <g>
        <g>
          <circle
            cx="19"
            cy="19"
            r="3"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="5"
            cy="5"
            r="3"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12.5 19.5H7.42476C5.80929 19.5 5.1046 17.4586 6.37606 16.462L17.1239 8.038C18.3954 7.04144 17.6907 5 16.0752 5H11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 3C3.89543 3 3 3.89543 3 5C3 6.10457 3.89543 7 5 7C6.10457 7 7 6.10457 7 5C7 3.89543 6.10457 3 5 3ZM1 5C1 2.79086 2.79086 1 5 1C7.20914 1 9 2.79086 9 5C9 7.20914 7.20914 9 5 9C2.79086 9 1 7.20914 1 5ZM19 17C17.8954 17 17 17.8954 17 19C17 20.1046 17.8954 21 19 21C20.1046 21 21 20.1046 21 19C21 17.8954 20.1046 17 19 17ZM15 19C15 16.7909 16.7909 15 19 15C21.2091 15 23 16.7909 23 19C23 21.2091 21.2091 23 19 23C16.7909 23 15 21.2091 15 19ZM11 4C10.4477 4 10 4.44772 10 5C10 5.55228 10.4477 6 11 6H16.0752C16.7404 6 17.0306 6.84059 16.5071 7.25094L5.75918 15.6749C3.73979 17.2577 4.85901 20.5 7.42476 20.5H12.5C13.0523 20.5 13.5 20.0523 13.5 19.5C13.5 18.9477 13.0523 18.5 12.5 18.5H7.42476C6.75957 18.5 6.4694 17.6594 6.99294 17.2491L17.7408 8.82505C19.7602 7.24229 18.641 4 16.0752 4H11Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
