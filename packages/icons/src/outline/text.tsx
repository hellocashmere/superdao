import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface TextIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function TextIcon({ className, ref, ...props }: TextIconProps) {
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
          d="M3 5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H4C3.44772 6 3 5.55228 3 5ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 19C3 18.4477 3.44772 18 4 18H16C16.5523 18 17 18.4477 17 19C17 19.5523 16.5523 20 16 20H4C3.44772 20 3 19.5523 3 19Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
