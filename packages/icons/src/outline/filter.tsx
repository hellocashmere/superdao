import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface FilterIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function FilterIcon({ ref, className, ...props }: FilterIconProps) {
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
					d="M2 7C2 6.44772 2.44772 6 3 6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H3C2.44772 8 2 7.55228 2 7ZM4 12.5C4 11.9477 4.44772 11.5 5 11.5H19C19.5523 11.5 20 11.9477 20 12.5C20 13.0523 19.5523 13.5 19 13.5H5C4.44772 13.5 4 13.0523 4 12.5ZM7 17C6.44772 17 6 17.4477 6 18C6 18.5523 6.44772 19 7 19H17C17.5523 19 18 18.5523 18 18C18 17.4477 17.5523 17 17 17H7Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
