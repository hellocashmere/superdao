import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface NullBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function NullBoldIcon({ className, ref, ...props }: NullBoldIconProps) {
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
          d="M20.1161 2.11612C20.6043 1.62796 21.3957 1.62796 21.8839 2.11612C22.372 2.60427 22.372 3.39573 21.8839 3.88388L19.365 6.40279C20.5478 7.95677 21.25 9.89638 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C9.89638 21.25 7.95677 20.5478 6.40279 19.365L3.88388 21.8839C3.39573 22.372 2.60427 22.372 2.11612 21.8839C1.62796 21.3957 1.62796 20.6043 2.11612 20.1161L4.63502 17.5972C3.45221 16.0432 2.75 14.1036 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C14.1036 2.75 16.0432 3.45221 17.5972 4.63502L20.1161 2.11612ZM15.807 6.42524C14.7233 5.68372 13.4123 5.25 12 5.25C8.27208 5.25 5.25 8.27208 5.25 12C5.25 13.4123 5.68372 14.7233 6.42523 15.807L15.807 6.42524ZM8.193 17.5748C9.27674 18.3163 10.5877 18.75 12 18.75C15.7279 18.75 18.75 15.7279 18.75 12C18.75 10.5877 18.3163 9.27675 17.5748 8.193L8.193 17.5748Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
