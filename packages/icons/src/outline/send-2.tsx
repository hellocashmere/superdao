import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface Send2IconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function Send2Icon({ className, ref, ...props }: Send2IconProps) {
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
          d="M4.92901 19.071C4.53848 18.6805 4.53848 18.0473 4.92901 17.6568L15.9498 6.63601L7.05033 6.63601C6.49804 6.63601 6.05033 6.18829 6.05033 5.63601C6.05033 5.08372 6.49804 4.63601 7.05033 4.63601L18.364 4.63601C18.9163 4.63601 19.364 5.08372 19.364 5.63601L19.364 16.9497C19.364 17.502 18.9163 17.9497 18.364 17.9497C17.8118 17.9497 17.364 17.502 17.364 16.9497L17.364 8.05022L6.34322 19.071C5.9527 19.4616 5.31953 19.4616 4.92901 19.071Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
