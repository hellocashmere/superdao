import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface CasualBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function CasualBoldIcon({
  className,
  ref,
  ...props
}: CasualBoldIconProps) {
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
          d="M13.7409 3.33225C16.4935 2.0477 19.7663 3.23779 21.0508 5.99038L22.6393 9.39428C22.6793 9.48007 22.7127 9.5672 22.7398 9.65511C22.7915 9.73122 22.8369 9.81319 22.8751 9.90064C23.2061 10.6601 22.8588 11.544 22.0994 11.8751L2.59939 20.3751C1.83998 20.7061 0.955997 20.3588 0.62497 19.5994C0.293943 18.84 0.64122 17.956 1.40064 17.625L4.12663 16.4367L3.14771 14.1526C1.97792 11.4231 3.18611 8.25782 5.87714 7.00201L13.7409 3.33225ZM23 14V16.5C23 17.6046 22.1046 18.5 21 18.5H12.5L23 14Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
