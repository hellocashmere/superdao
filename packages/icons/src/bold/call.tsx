import type { ComponentPropsWithRef } from "react"

import { IconBase } from "../shared/icon"

export interface CallBoldIconProps extends ComponentPropsWithRef<
  typeof IconBase
> {}

export function CallBoldIcon({ className, ref, ...props }: CallBoldIconProps) {
  return (
    <IconBase
      {...props}
      ref={ref}
      className={className}
    >
      <g>
        <path
          d="M7.7982 16.1983C14.5157 22.9158 18.7584 21.5016 21.5868 18.6732C22.3678 17.8921 22.3678 16.6258 21.5868 15.8447L19.2666 13.5246C18.4001 12.6581 16.9953 12.6581 16.1288 13.5246C15.3419 14.3114 14.1961 14.6562 13.2268 14.1094C12.6577 13.7884 11.9957 13.3247 11.3337 12.6628C10.6718 12.0008 10.2081 11.3388 9.88704 10.7696C9.34032 9.80042 9.68505 8.65459 10.4719 7.86772C11.3384 7.00123 11.3384 5.59636 10.4719 4.72986L8.15176 2.40971C7.37071 1.62866 6.10438 1.62866 5.32333 2.40971C2.4949 5.23813 1.08069 9.48077 7.7982 16.1983Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  )
}
