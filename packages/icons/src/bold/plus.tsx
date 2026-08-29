import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface PlusBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function PlusBoldIcon({ className, ref, ...props }: PlusBoldIconProps) {
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
          d="M12 3.25C12.6904 3.25 13.25 3.80964 13.25 4.5V10.75H19.5C20.1904 10.75 20.75 11.3096 20.75 12C20.75 12.6904 20.1904 13.25 19.5 13.25H13.25V19.5C13.25 20.1904 12.6904 20.75 12 20.75C11.3096 20.75 10.75 20.1904 10.75 19.5V13.25H4.5C3.80964 13.25 3.25 12.6904 3.25 12C3.25 11.3096 3.80964 10.75 4.5 10.75H10.75V4.5C10.75 3.80964 11.3096 3.25 12 3.25Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
