import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface WarningBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function WarningBoldIcon({ className, ref, ...props }: WarningBoldIconProps) {
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
          d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM13.5 16.25C13.5 16.9404 12.9404 17.5 12.25 17.5C11.5596 17.5 11 16.9404 11 16.25C11 15.5596 11.5596 15 12.25 15C12.9404 15 13.5 15.5596 13.5 16.25ZM12.25 6C11.5735 6 11.0381 6.57225 11.0831 7.24723L11.4501 12.7517C11.4782 13.1728 11.828 13.5 12.25 13.5C12.672 13.5 13.0218 13.1728 13.0499 12.7517L13.4169 7.24723C13.4619 6.57225 12.9265 6 12.25 6Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
