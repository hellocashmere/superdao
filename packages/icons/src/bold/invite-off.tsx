import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface InviteOffBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function InviteOffBoldIcon({
  className,
  ref,
  ...props
}: InviteOffBoldIconProps) {
  return (
    <IconBase
      {...props}
      ref={ref}
      className={className}
    >
      <g>
        <g>
          <path
            d="M16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6Z"
            fill="currentColor"
          />
          <path
            d="M11.6527 12.0029C4.43804 12.1243 2.5 16.0234 2.5 17.5C2.5 19 3.5 20 5 20H11.6546C10.9232 18.8423 10.5 17.4706 10.5 16C10.5 14.5307 10.9225 13.16 11.6527 12.0029Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 21.5C21.0376 21.5 23.5 19.0376 23.5 16C23.5 12.9624 21.0376 10.5 18 10.5C14.9624 10.5 12.5 12.9624 12.5 16C12.5 19.0376 14.9624 21.5 18 21.5ZM20.5657 15.5657C20.8781 15.2533 20.8781 14.7467 20.5657 14.4343C20.2533 14.1219 19.7467 14.1219 19.4343 14.4343L17.25 16.6186L16.5657 15.9343C16.2533 15.6219 15.7467 15.6219 15.4343 15.9343C15.1219 16.2467 15.1219 16.7533 15.4343 17.0657L16.6843 18.3157C16.9967 18.6281 17.5033 18.6281 17.8157 18.3157L20.5657 15.5657Z"
            fill="currentColor"
          />
        </g>
      </g>
    </IconBase>
  )
}
