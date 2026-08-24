import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface HelpBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function HelpBoldIcon({ className, ref, ...props }: HelpBoldIconProps) {
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
          d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM10.5 9.5C10.5 8.6716 11.1716 8.00006 12 8.00006C12.8284 8.00006 13.5 8.67163 13.5 9.50006V9.55403C13.5 10.0999 13.2136 10.6057 12.7455 10.8865L12.343 11.1281C11.5098 11.628 11 12.5284 11 13.5001C11 14.0523 11.4479 14.5 12.0001 14.5C12.5524 14.5 13.0001 14.0523 13.0001 13.5C13.0001 13.2309 13.1412 12.9815 13.372 12.8431L13.7745 12.6015C14.845 11.9592 15.5 10.8024 15.5 9.55403V9.50006C15.5 7.56706 13.933 6.00006 12 6.00006C10.067 6.00006 8.5 7.56706 8.5 9.50006C8.50003 10.0523 8.94786 10.5 9.50012 10.5C10.0524 10.5 10.5 10.0523 10.5 9.5ZM13.25 17.2501C13.25 17.9404 12.6904 18.5001 12 18.5001C11.3096 18.5001 10.75 17.9404 10.75 17.2501C10.75 16.5597 11.3096 16.0001 12 16.0001C12.6904 16.0001 13.25 16.5597 13.25 17.2501Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
