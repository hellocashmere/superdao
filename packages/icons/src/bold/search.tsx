import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface SearchBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function SearchBoldIcon({ className, ref, ...props }: SearchBoldIconProps) {
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
          d="M6.03491 10.3967C6.03491 7.98777 7.98771 6.03497 10.3966 6.03497C12.8055 6.03497 14.7583 7.98777 14.7583 10.3967C14.7583 12.8056 12.8055 14.7584 10.3966 14.7584C7.98771 14.7584 6.03491 12.8056 6.03491 10.3967ZM10.3966 3.53497C6.607 3.53497 3.53491 6.60706 3.53491 10.3967C3.53491 14.1863 6.607 17.2584 10.3966 17.2584C11.8398 17.2584 13.1789 16.8128 14.284 16.0518L18.3311 20.0989C18.8193 20.5871 19.6107 20.5871 20.0989 20.0989C20.587 19.6108 20.587 18.8193 20.0989 18.3312L16.0517 14.284C16.8128 13.179 17.2583 11.8399 17.2583 10.3967C17.2583 6.60706 14.1862 3.53497 10.3966 3.53497Z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}
