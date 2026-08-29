import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface MinusBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function MinusBoldIcon({ className, ref, ...props }: MinusBoldIconProps) {
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
          d="M3.25 12C3.25 11.3096 3.80964 10.75 4.5 10.75H19.5C20.1904 10.75 20.75 11.3096 20.75 12C20.75 12.6904 20.1904 13.25 19.5 13.25H4.5C3.80964 13.25 3.25 12.6904 3.25 12Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
