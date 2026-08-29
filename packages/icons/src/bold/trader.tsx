import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface TraderBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function TraderBoldIcon({ className, ref, ...props }: TraderBoldIconProps) {
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
          d="M22.2375 4.98744C22.9209 4.30402 22.9209 3.19598 22.2375 2.51256C21.554 1.82915 20.446 1.82915 19.7626 2.51256L13.7165 8.55864L9.51217 6.10611C8.47936 5.50364 7.17562 5.63757 6.28687 6.43744L1.82933 10.4492C1.11093 11.0958 1.0527 12.2023 1.69925 12.9207C2.3458 13.6391 3.45231 13.6973 4.1707 13.0508L8.22141 9.40513L12.4524 11.8732C13.5314 12.5026 14.8992 12.3257 15.7826 11.4423L22.2375 4.98744ZM3 17.5C2.0335 17.5 1.25 18.2835 1.25 19.25C1.25 20.2165 2.0335 21 3 21H21C21.9665 21 22.75 20.2165 22.75 19.25C22.75 18.2835 21.9665 17.5 21 17.5H3Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
