import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface AddOffIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function AddOffIcon({ className, ref, ...props }: AddOffIconProps) {
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
          d="M2.25 12C2.25 11.4477 2.69772 11 3.25 11H20.75C21.3023 11 21.75 11.4477 21.75 12C21.75 12.5523 21.3023 13 20.75 13H3.25C2.69772 13 2.25 12.5523 2.25 12Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
