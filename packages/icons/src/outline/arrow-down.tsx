import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface ArrowDownIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function ArrowDownIcon({ className, ref, ...props }: ArrowDownIconProps) {
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
          d="M3.62156 8.29722C4.0097 7.81205 4.71765 7.73339 5.20282 8.12153L12 13.5593L18.7973 8.12153C19.2824 7.73339 19.9904 7.81205 20.3785 8.29722C20.7667 8.78239 20.688 9.49035 20.2028 9.87848L12.7028 15.8785C12.292 16.2072 11.7081 16.2072 11.2973 15.8785L3.79726 9.87848C3.31209 9.49035 3.23343 8.78239 3.62156 8.29722Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
