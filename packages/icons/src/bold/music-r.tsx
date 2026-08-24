import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface MusicRBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function MusicRBoldIcon({
  className,
  ref,
  ...props
}: MusicRBoldIconProps) {
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
          d="M9.88157 4.06061V14.1515L9.88158 14.1579C9.88158 16.5415 7.94933 18.4737 5.56579 18.4737C3.18224 18.4737 1.25 16.5415 1.25 14.1579C1.25 11.7744 3.18224 9.84216 5.56579 9.84216C5.93835 9.84216 6.29988 9.88936 6.64473 9.97812V3.29041C6.64473 1.41853 8.50473 0.115736 10.2639 0.755437L19.9744 4.28654C21.0404 4.67416 21.75 5.68725 21.75 6.82151V18.4737C21.75 20.8572 19.8177 22.7894 17.4342 22.7894C15.0507 22.7894 13.1184 20.8572 13.1184 18.4736C13.1184 16.0901 15.0507 14.1578 17.4342 14.1578C17.8068 14.1578 18.1683 14.205 18.5132 14.2938V7.19937L9.88157 4.06061Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
