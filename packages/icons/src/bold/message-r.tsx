import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface MessageRBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function MessageRBoldIcon({ ref, className, ...props }: MessageRBoldIconProps) {
	return (
		<IconBase
			ref={ref}
			className={className}
			{...props}
		>
			<g>
				<path
					d="M12 20C17.5228 20 22 15.9706 22 11C22 6.02944 17.5228 2 12 2C6.47715 2 2 6.02944 2 11C2 13.0633 2.77149 14.9645 4.06903 16.4826L3.48102 18.0506C3.02199 19.2747 2.79248 19.8867 2.92826 20.2408C3.04592 20.5476 3.30682 20.7771 3.62617 20.8546C3.9947 20.944 4.57239 20.6381 5.72777 20.0265L7.54977 19.0619C8.89005 19.6623 10.4012 20 12 20Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
