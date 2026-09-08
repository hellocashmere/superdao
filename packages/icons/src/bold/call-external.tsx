import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface CallExternalBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function CallExternalBoldIcon({ ref, className, ...props }: CallExternalBoldIconProps) {
	return (
		<IconBase
			{...props}
			ref={ref}
			className={className}
		>
			<g>
				<g>
					<path
						d="M6.85516 17.5551C14.1702 24.8701 18.7903 23.3301 21.8703 20.2501C22.7208 19.3996 22.7208 18.0206 21.8703 17.1701L19.3438 14.6435C18.4002 13.6999 16.8703 13.6999 15.9268 14.6435C15.0699 15.5004 13.8222 15.8758 12.7667 15.2804C12.1469 14.9308 11.4261 14.4259 10.7052 13.705C9.98433 12.9842 9.47942 12.2633 9.12981 11.6435C8.53445 10.5881 8.90985 9.34032 9.76671 8.48346C10.7103 7.53989 10.7103 6.01005 9.76671 5.06648L7.24016 2.53993C6.38964 1.6894 5.01066 1.6894 4.16013 2.53993C1.0801 5.61996 -0.459912 10.24 6.85516 17.5551Z"
						fill="currentColor"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M17.5 2C17.5 1.44772 17.9478 1 18.5 1H22C22.5523 1 23 1.44772 23 2V5.5C23 6.05228 22.5523 6.5 22 6.5C21.4478 6.5 21 6.05228 21 5.5V4.41421L17.7071 7.70711C17.3166 8.09763 16.6835 8.09763 16.2929 7.70711C15.9024 7.31658 15.9024 6.68342 16.2929 6.29289L19.5858 3H18.5C17.9478 3 17.5 2.55228 17.5 2Z"
						fill="currentColor"
					/>
				</g>
			</g>
		</IconBase>
	);
}
