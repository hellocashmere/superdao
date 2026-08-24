import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface ZapperCircleIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function ZapperCircleIcon({
  className,
  ref,
  ...props
}: ZapperCircleIconProps) {
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
          d="M7.14758 8.54798L15.1927 8.50481C15.5841 8.50271 15.826 8.93085 15.6223 9.26506L13.948 12.0114L18.096 11.9896C18.4891 11.9875 18.7308 12.419 18.5236 12.7531L16.859 15.4373L8.76845 15.4937C8.3744 15.4964 8.13219 15.0635 8.34071 14.7291L10.0344 12.0132L5.89796 12.0115C5.50612 12.0113 5.26673 11.581 5.47324 11.248L7.14758 8.54798Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.9375 12C20.9375 16.936 16.936 20.9375 12 20.9375C7.06395 20.9375 3.0625 16.936 3.0625 12C3.0625 7.06395 7.06395 3.0625 12 3.0625C16.936 3.0625 20.9375 7.06395 20.9375 12ZM23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
