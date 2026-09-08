import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface BriefcaseBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function BriefcaseBoldIcon({ ref, className, ...props }: BriefcaseBoldIconProps) {
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
					d="M9.12476 6.99951V4.62451H14.8748V6.99951H9.12476ZM6.87476 6.99951V4.49951C6.87476 3.32591 7.82615 2.37451 8.99976 2.37451H14.9998C16.1734 2.37451 17.1248 3.32591 17.1248 4.49951V6.99951H17.9998C20.2089 6.99951 21.9998 8.79037 21.9998 10.9995V17.9995C21.9998 20.2087 20.2089 21.9995 17.9998 21.9995H5.99976C3.79062 21.9995 1.99976 20.2087 1.99976 17.9995V10.9995C1.99976 8.79037 3.79062 6.99951 5.99976 6.99951H6.87476Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
