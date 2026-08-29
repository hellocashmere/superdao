import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface MirrorIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function MirrorIcon({ className, ref, ...props }: MirrorIconProps) {
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
          d="M11.9943 1C7.53739 1 3.92432 4.63949 3.92432 9.12903V20.7647C3.92432 21.447 4.47336 22 5.15065 22H18.838C19.5153 22 20.0644 21.447 20.0644 20.7647V9.12903C20.0644 4.63949 16.4513 1 11.9943 1ZM6.00002 9.59982C6.00002 5.95484 8.6863 3 12 3C15.3137 3 18 5.95484 18 9.59982V19.1832C18 19.6343 17.6676 20 17.2574 20H6.74259C6.33248 20 6.00002 19.6343 6.00002 19.1832V9.59982Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
