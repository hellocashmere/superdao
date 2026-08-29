import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface DonationBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function DonationBoldIcon({ className, ref, ...props }: DonationBoldIconProps) {
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
          d="M4.57356 3.28209C5.09544 2.62975 5.88555 2.25 6.72095 2.25H17.2791C18.1145 2.25 18.9046 2.62975 19.4265 3.28209L22.4763 7.09444C23.1337 7.91618 23.1337 9.08382 22.4763 9.90556L13.3665 21.2928C12.666 22.1685 11.3341 22.1685 10.6335 21.2928L1.52368 9.90556C0.866291 9.08382 0.866292 7.91618 1.52368 7.09444L4.57356 3.28209ZM6.72095 4.75C6.64501 4.75 6.57318 4.78452 6.52573 4.84383L3.6008 8.5L20.3992 8.5L17.4743 4.84383C17.4269 4.78452 17.355 4.75 17.2791 4.75H6.72095Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
