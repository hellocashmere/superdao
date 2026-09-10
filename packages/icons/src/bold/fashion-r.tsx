import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface FashionRBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function FashionRBoldIcon({ ref, className, ...props }: FashionRBoldIconProps) {
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
					d="M8.53205 1.9951L8.13979 1.31506L3.30062 2.72514C2.23364 3.03605 1.5 4.01397 1.5 5.12532V7.29652C1.5 8.51011 2.57208 9.44402 3.77421 9.27763L5.44444 9.04645L5.44444 19.7874C5.44444 21.4442 6.78759 22.7874 8.44444 22.7874H15.5556C17.2124 22.7874 18.5556 21.4442 18.5556 19.7874V9.04648L20.2257 9.27771C21.4279 9.44414 22.5 8.51022 22.5 7.29661V5.12543C22.5 4.01409 21.7664 3.03617 20.6994 2.72526L15.8602 1.31511L15.4679 1.99514C14.7754 3.19568 13.481 4.00009 12 4.00009C10.5189 4.00009 9.22457 3.19566 8.53205 1.9951Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
