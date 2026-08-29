import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface EraseBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function EraseBoldIcon({ className, ref, ...props }: EraseBoldIconProps) {
  return (
    <IconBase
      {...props}
      ref={ref}
      className={className}
    >
      <g>
        <g>
          <path
            d="M20.6264 6.07033L18.9294 4.37327C17.7413 3.18522 17.1473 2.5912 16.4623 2.36863C15.8598 2.17286 15.2107 2.17286 14.6082 2.36863C13.9232 2.5912 13.3292 3.18522 12.1412 4.37327L8.64097 7.87345L17.1263 16.3587L20.6264 12.8586C21.8145 11.6705 22.4085 11.0765 22.6311 10.3915C22.8268 9.78896 22.8269 9.13992 22.6311 8.53739C22.4085 7.85241 21.8145 7.25838 20.6264 6.07033Z"
            fill="currentColor"
          />
          <path
            d="M6.87321 9.64122L3.37303 13.1414C2.18498 14.3294 1.59095 14.9235 1.36839 15.6085C1.17261 16.211 1.17261 16.86 1.36839 17.4626C1.59095 18.1475 2.18498 18.7416 3.37303 19.9296L4.22156 20.7782H12.7068L15.3585 18.1265L6.87321 9.64122Z"
            fill="currentColor"
          />
        </g>
      </g>
    </IconBase>
  );
}
