import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface AppearanceBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function AppearanceBoldIcon({ ref, className, ...props }: AppearanceBoldIconProps) {
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
					d="M21.1251 6.11534L13.35 15.2499C13.35 15.2499 13 13.4999 11.75 12.2499C10.5 10.9999 8.75004 10.6499 8.75004 10.6499L17.8847 2.87491C18.797 2.09834 20.1529 2.15276 21 2.99995C21.8472 3.84714 21.9017 5.20298 21.1251 6.11534ZM7.50004 20.5C9.70011 20.2999 11.5 18.7091 11.5 16.4999C11.5 14.2908 9.70918 12.4999 7.50004 12.4999C5.2909 12.4999 3.50004 14.2908 3.50004 16.4999C3.50004 17.4152 2.76705 17.5975 1.97195 17.526C1.27609 17.4634 0.763143 18.1159 1.27778 18.5884C2.42423 19.6411 4.40961 20.7809 7.50004 20.5Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
