import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface BlockBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function BlockBoldIcon({ ref, className, ...props }: BlockBoldIconProps) {
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
					d="M5.17067 6.93844C4.12098 8.35242 3.5 10.1037 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C13.8963 20.5 15.6476 19.879 17.0616 18.8293L5.17067 6.93844ZM6.93844 5.17067L18.8293 17.0616C19.879 15.6476 20.5 13.8963 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C10.1037 3.5 8.35242 4.12098 6.93844 5.17067ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
