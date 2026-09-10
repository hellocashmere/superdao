import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface WalletMoneyIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function WalletMoneyIcon({ ref, className, ...props }: WalletMoneyIconProps) {
	return (
		<IconBase
			ref={ref}
			className={className}
			{...props}
		>
			<g>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M1 7C1 4.79086 2.79086 3 5 3H19C21.2091 3 23 4.79086 23 7V8V16V17C23 19.2091 21.2091 21 19 21H5C2.79086 21 1 19.2091 1 17V7ZM21 7V8H16C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16H21V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7ZM16 10H21V14H16C14.8954 14 14 13.1046 14 12C14 10.8954 14.8954 10 16 10ZM16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
