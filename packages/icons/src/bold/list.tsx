import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface ListBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function ListBoldIcon({ ref, className, ...props }: ListBoldIconProps) {
	return (
		<IconBase
			ref={ref}
			className={className}
			{...props}
		>
			<g>
				<g>
					<path
						d="M8 5H21M8 12H21M8 19H21"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M3 7C4.10457 7 5 6.10457 5 5C5 3.89543 4.10457 3 3 3C1.89543 3 1 3.89543 1 5C1 6.10457 1.89543 7 3 7ZM5 12C5 13.1046 4.10457 14 3 14C1.89543 14 1 13.1046 1 12C1 10.8954 1.89543 10 3 10C4.10457 10 5 10.8954 5 12ZM5 19C5 20.1046 4.10457 21 3 21C1.89543 21 1 20.1046 1 19C1 17.8954 1.89543 17 3 17C4.10457 17 5 17.8954 5 19Z"
						fill="currentColor"
					/>
				</g>
			</g>
		</IconBase>
	);
}
