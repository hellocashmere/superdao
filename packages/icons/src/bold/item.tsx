import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface ItemBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function ItemBoldIcon({ ref, className, ...props }: ItemBoldIconProps) {
	return (
		<IconBase
			ref={ref}
			className={className}
			{...props}
		>
			<g>
				<g>
					<path
						d="M10.8858 9.05437L4.18581 6.37436C3.36664 6.04669 3.34227 4.89601 4.14683 4.53396L10.7689 1.55403C11.5518 1.20172 12.4482 1.20172 13.2311 1.55403L19.8532 4.53396C20.6577 4.89602 20.6334 6.04669 19.8142 6.37436L13.1142 9.05437C12.3989 9.34046 11.6011 9.34046 10.8858 9.05437Z"
						fill="currentColor"
					/>
					<path
						d="M9.72489 10.5042L3.36245 8.02988C2.70691 7.77495 2 8.25853 2 8.96189V17.6319C2 18.4567 2.50636 19.197 3.27511 19.4959L9.63755 21.9702C10.2931 22.2251 11 21.7416 11 21.0382V12.3682C11 11.5434 10.4936 10.8031 9.72489 10.5042Z"
						fill="currentColor"
					/>
					<path
						d="M20.6376 8.02988L14.2751 10.5042C13.5064 10.8031 13 11.5434 13 12.3682V21.0382C13 21.7416 13.7069 22.2251 14.3624 21.9702L20.7249 19.4959C21.4936 19.197 22 18.4567 22 17.6319V8.96189C22 8.25853 21.2931 7.77495 20.6376 8.02988Z"
						fill="currentColor"
					/>
				</g>
			</g>
		</IconBase>
	);
}
