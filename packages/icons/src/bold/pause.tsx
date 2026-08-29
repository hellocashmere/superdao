import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface PauseBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function PauseBoldIcon({ className, ref, ...props }: PauseBoldIconProps) {
  return (
    <IconBase
      {...props}
      ref={ref}
      className={className}
    >
      <g>
        <g>
          <path
            d="M5 4C5 3.17157 5.67157 2.5 6.5 2.5H8.5C9.32843 2.5 10 3.17157 10 4V20C10 20.8284 9.32843 21.5 8.5 21.5H6.5C5.67157 21.5 5 20.8284 5 20V4Z"
            fill="currentColor"
          />
          <path
            d="M14 4C14 3.17157 14.6716 2.5 15.5 2.5H17.5C18.3284 2.5 19 3.17157 19 4V20C19 20.8284 18.3284 21.5 17.5 21.5H15.5C14.6716 21.5 14 20.8284 14 20V4Z"
            fill="currentColor"
          />
        </g>
      </g>
    </IconBase>
  );
}
