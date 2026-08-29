import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface ArrowUpBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function ArrowUpBoldIcon({ className, ref, ...props }: ArrowUpBoldIconProps) {
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
          d="M11.1161 5.61612C11.6043 5.12796 12.3957 5.12796 12.8839 5.61612L21.3839 14.1161C21.872 14.6043 21.872 15.3957 21.3839 15.8839C20.8957 16.372 20.1043 16.372 19.6161 15.8839L12 8.26777L4.38388 15.8839C3.89573 16.372 3.10427 16.372 2.61612 15.8839C2.12796 15.3957 2.12796 14.6043 2.61612 14.1161L11.1161 5.61612Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
