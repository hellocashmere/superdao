import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface ZerionIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function ZerionIcon({ className, ref, ...props }: ZerionIconProps) {
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
          d="M1.34034 3.17187C1.5313 2.56127 2.10197 2.08002 2.84717 2.08002H20.1543C21.492 2.08002 22.4994 3.59908 21.5819 4.82534L21.5757 4.83367L16.2824 11.7571C15.7563 12.4547 14.784 12.6138 14.0601 12.1732L2.0109 4.93464C1.35163 4.53027 1.14687 3.79048 1.34034 3.17187ZM4.47206 4.08002L14.8622 10.3218L19.6343 4.08002H4.47206ZM9.95104 11.8234L22.0038 19.061C22.6691 19.469 22.8657 20.2148 22.6701 20.8302C22.4774 21.4361 21.9087 21.9195 21.1618 21.9195H3.86787C3.18639 21.9195 2.60801 21.552 2.30849 21.0195C2.00422 20.4786 1.99205 19.7629 2.42886 19.1791L2.4357 19.1699L7.73896 12.2481C8.24746 11.5744 9.20244 11.3676 9.95104 11.8234ZM9.16035 13.6814L4.38102 19.9195H19.5485L9.16035 13.6814Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
