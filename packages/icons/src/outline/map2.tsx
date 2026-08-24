import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface Map2IconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function Map2Icon({ className, ref, ...props }: Map2IconProps) {
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
          d="M8.10557 2.32919C8.66863 2.04766 9.33137 2.04766 9.89443 2.32919L15 4.88197L19.1056 2.82919C20.4354 2.16429 22 3.13128 22 4.61804V17.382C22 18.1395 21.572 18.832 20.8944 19.1708L15.8944 21.6708C15.3314 21.9524 14.6686 21.9524 14.1056 21.6708L9 19.118L4.89443 21.1708C3.56462 21.8357 2 20.8687 2 19.382V6.61804C2 5.8605 2.428 5.16797 3.10557 4.82919L8.10557 2.32919ZM14 6.61804L10 4.61804V17.382L14 19.382V6.61804ZM16 6.61804V19.382L20 17.382V4.61804L16 6.61804ZM4 6.61804L8 4.61804V17.382L4 19.382L4 6.61804Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
