import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface MailBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function MailBoldIcon({ className, ref, ...props }: MailBoldIconProps) {
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
          d="M2.32698 5.13803C2 5.77976 2 6.61984 2 8.3V15.7C2 17.3802 2 18.2202 2.32698 18.862C2.6146 19.4265 3.07354 19.8854 3.63803 20.173C4.27976 20.5 5.11984 20.5 6.8 20.5H17.2C18.8802 20.5 19.7202 20.5 20.362 20.173C20.9265 19.8854 21.3854 19.4265 21.673 18.862C22 18.2202 22 17.3802 22 15.7V8.3C22 6.61984 22 5.77976 21.673 5.13803C21.3854 4.57354 20.9265 4.1146 20.362 3.82698C19.7202 3.5 18.8802 3.5 17.2 3.5H6.8C5.11984 3.5 4.27976 3.5 3.63803 3.82698C3.07354 4.1146 2.6146 4.57354 2.32698 5.13803ZM6.6207 6.71595C6.18769 6.37315 5.55876 6.44628 5.21595 6.8793C4.87315 7.31231 4.94628 7.94124 5.3793 8.28405L11.3793 13.034C11.743 13.322 12.257 13.322 12.6207 13.034L18.6207 8.28405C19.0537 7.94124 19.1269 7.31231 18.784 6.8793C18.4412 6.44628 17.8123 6.37315 17.3793 6.71595L12 10.9746L6.6207 6.71595Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
