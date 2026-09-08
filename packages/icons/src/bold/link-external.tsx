import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface LinkExternalBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function LinkExternalBoldIcon({ ref, className, ...props }: LinkExternalBoldIconProps) {
	return (
		<IconBase
			{...props}
			ref={ref}
			className={className}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M1.33333 1C1.33333 0.447715 1.78105 0 2.33333 0H9C9.55229 0 10 0.447715 10 1V7.66667C10 8.21895 9.55229 8.66667 9 8.66667C8.44772 8.66667 8 8.21895 8 7.66667V3.41421L1.70711 9.70711C1.31658 10.0976 0.683417 10.0976 0.292893 9.70711C-0.0976311 9.31658 -0.0976311 8.68342 0.292893 8.29289L6.58579 2H2.33333C1.78105 2 1.33333 1.55228 1.33333 1Z"
				fill="currentColor"
				transform="scale(2.4)"
			/>
		</IconBase>
	);
}
