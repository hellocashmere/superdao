import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface Badge5IconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function Badge5Icon({ className, ref, ...props }: Badge5IconProps) {
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
          d="M5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10C19 13.866 15.866 17 12 17C8.13401 17 5 13.866 5 10ZM12 1C7.02944 1 3 5.02944 3 10C3 13.0836 4.55081 15.8051 6.91506 17.4269L6.01361 22.8356C5.95422 23.1919 6.0916 23.5525 6.37298 23.779C6.65437 24.0055 7.03602 24.0626 7.37139 23.9285L12 22.077L16.6286 23.9285C16.964 24.0626 17.3456 24.0055 17.627 23.779C17.9084 23.5525 18.0458 23.1919 17.9864 22.8356L17.0849 17.4269C19.4492 15.8051 21 13.0836 21 10C21 5.02944 16.9706 1 12 1ZM15.2206 18.4066C14.2207 18.79 13.1349 19 12 19C10.8651 19 9.77934 18.79 8.77936 18.4066L8.27853 21.4116L11.6286 20.0715C11.867 19.9762 12.133 19.9762 12.3714 20.0715L15.7215 21.4116L15.2206 18.4066Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
