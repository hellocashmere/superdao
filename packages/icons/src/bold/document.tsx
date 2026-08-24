import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface DocumentBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function DocumentBoldIcon({
  className,
  ref,
  ...props
}: DocumentBoldIconProps) {
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
          d="M4.32698 4.13803C4 4.77976 4 5.61984 4 7.3V16.7C4 18.3802 4 19.2202 4.32698 19.862C4.6146 20.4265 5.07354 20.8854 5.63803 21.173C6.27976 21.5 7.11984 21.5 8.8 21.5H15.2C16.8802 21.5 17.7202 21.5 18.362 21.173C18.9265 20.8854 19.3854 20.4265 19.673 19.862C20 19.2202 20 18.3802 20 16.7V10.4882C20 9.75445 20 9.38757 19.9171 9.0423C19.8436 8.7362 19.7224 8.44356 19.5579 8.17515C19.3724 7.8724 19.113 7.61297 18.5941 7.09412L15.4059 3.90589C14.887 3.38703 14.6276 3.1276 14.3249 2.94208C14.0564 2.77759 13.7638 2.65638 13.4577 2.58289C13.1124 2.5 12.7455 2.5 12.0118 2.5H8.8C7.11984 2.5 6.27976 2.5 5.63803 2.82698C5.07354 3.1146 4.6146 3.57354 4.32698 4.13803ZM13 5.5L17 9.5H13V5.5Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
