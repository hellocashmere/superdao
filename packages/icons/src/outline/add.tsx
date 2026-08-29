import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface AddIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function AddIcon({ className, ref, ...props }: AddIconProps) {
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
          d="M12 2.25C12.5523 2.25 13 2.69772 13 3.25V11H20.75C21.3023 11 21.75 11.4477 21.75 12C21.75 12.5523 21.3023 13 20.75 13H13V20.75C13 21.3023 12.5523 21.75 12 21.75C11.4477 21.75 11 21.3023 11 20.75V13H3.25C2.69772 13 2.25 12.5523 2.25 12C2.25 11.4477 2.69772 11 3.25 11H11V3.25C11 2.69772 11.4477 2.25 12 2.25Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
