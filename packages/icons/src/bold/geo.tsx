import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface GeoBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function GeoBoldIcon({ className, ref, ...props }: GeoBoldIconProps) {
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
          d="M13.0819 21.5167C15.4736 20.3325 21 16.9091 21 10.5581C21 5.55547 16.9706 1.5 12 1.5C7.02944 1.5 3 5.55547 3 10.5581C3 16.9091 8.52645 20.3325 10.9181 21.5167C11.2136 21.663 11.3613 21.7362 11.6343 21.7869C11.8208 21.8216 12.1792 21.8216 12.3657 21.7869C12.6387 21.7362 12.7864 21.663 13.0819 21.5167ZM12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </IconBase>
  );
}
