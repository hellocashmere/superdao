import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface WarningIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function WarningIcon({ className, ref, ...props }: WarningIconProps) {
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
          d="M12 3.25C7.16751 3.25 3.25 7.16751 3.25 12C3.25 16.8325 7.16751 20.75 12 20.75C16.8325 20.75 20.75 16.8325 20.75 12C20.75 7.16751 16.8325 3.25 12 3.25ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM13.25 16.25C13.25 16.9404 12.6904 17.5 12 17.5C11.3096 17.5 10.75 16.9404 10.75 16.25C10.75 15.5596 11.3096 15 12 15C12.6904 15 13.25 15.5596 13.25 16.25ZM12 6C11.3235 6 10.7881 6.57225 10.8331 7.24723L11.2001 12.7517C11.2282 13.1728 11.578 13.5 12 13.5C12.422 13.5 12.7718 13.1728 12.7999 12.7517L13.1669 7.24723C13.2118 6.57225 12.6765 6 12 6Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
