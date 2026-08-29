import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface MirrorBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function MirrorBoldIcon({ className, ref, ...props }: MirrorBoldIconProps) {
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
          d="M11.9943 1.5C7.53739 1.5 3.92432 5.13949 3.92432 9.62903V9.65272V21.2647V21.491C3.92432 22.0482 4.37148 22.5 4.92308 22.5H5.15065H18.838H19.0656C19.6172 22.5 20.0644 22.0482 20.0644 21.491V21.2647V9.65272V9.62903C20.0644 5.13949 16.4513 1.5 11.9943 1.5Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
