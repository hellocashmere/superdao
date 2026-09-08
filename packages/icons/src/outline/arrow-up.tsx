import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface ArrowUpIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function ArrowUpIcon({ ref, className, ...props }: ArrowUpIconProps) {
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
					d="M2.79289 15.7071C3.18342 16.0976 3.81658 16.0976 4.20711 15.7071L12 7.91421L19.7929 15.7071C20.1834 16.0976 20.8166 16.0976 21.2071 15.7071C21.5976 15.3166 21.5976 14.6834 21.2071 14.2929L12.7071 5.79289C12.3166 5.40237 11.6834 5.40237 11.2929 5.79289L2.79289 14.2929C2.40237 14.6834 2.40237 15.3166 2.79289 15.7071Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
