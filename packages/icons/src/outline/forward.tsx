import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface ForwardIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function ForwardIcon({ ref, className, ...props }: ForwardIconProps) {
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
					d="M12.7929 1.79289C12.4024 2.18342 12.4024 2.81658 12.7929 3.20711L18.5858 9H11C7.9446 9 5.58945 9.49633 4.04289 11.0429C2.49633 12.5895 2 14.9446 2 18V21C2 21.5523 2.44772 22 3 22C3.55228 22 4 21.5523 4 21V18C4 15.0554 4.50367 13.4105 5.45711 12.4571C6.41054 11.5037 8.0554 11 11 11H18.5858L12.7929 16.7929C12.4024 17.1834 12.4024 17.8166 12.7929 18.2071C13.1834 18.5976 13.8166 18.5976 14.2071 18.2071L21.7071 10.7071C22.0976 10.3166 22.0976 9.68342 21.7071 9.29289L14.2071 1.79289C13.8166 1.40237 13.1834 1.40237 12.7929 1.79289Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
