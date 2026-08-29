import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface DonationIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function DonationIcon({ className, ref, ...props }: DonationIconProps) {
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
          d="M6.13814 2C5.36239 2 4.63059 2.36012 4.15731 2.97477L0.677426 7.4941C0.123638 8.2133 0.123638 9.21527 0.677426 9.93447L10.8115 23.0956C11.4119 23.8754 12.588 23.8754 13.1885 23.0956L23.3225 9.93447C23.8763 9.21527 23.8763 8.2133 23.3225 7.4941L19.8427 2.97477C19.3694 2.36012 18.6376 2 17.8618 2H6.13814ZM5.74197 4.19495C5.83663 4.07202 5.98299 4 6.13814 4H17.8618C18.017 4 18.1633 4.07202 18.258 4.19495L21.1879 8H2.81209L5.74197 4.19495ZM3.25208 10L12 21.3609L20.7479 10H3.25208Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
