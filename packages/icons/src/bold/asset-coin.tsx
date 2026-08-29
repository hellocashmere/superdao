import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface AssetCoinBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function AssetCoinBoldIcon({ className, ref, ...props }: AssetCoinBoldIconProps) {
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
          d="M12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75ZM15.7165 12.4961L12.4341 18.2403C12.2422 18.5762 11.7578 18.5762 11.5659 18.2403L8.28351 12.4961C8.10783 12.1887 8.10783 11.8113 8.28351 11.5039L11.5659 5.75971C11.7578 5.42381 12.2422 5.42381 12.4341 5.75971L15.7165 11.5039C15.8922 11.8113 15.8922 12.1887 15.7165 12.4961Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
