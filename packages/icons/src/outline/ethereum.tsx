import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface EthereumIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function EthereumIcon({ ref, className, ...props }: EthereumIconProps) {
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
					d="M12 0.599976C12.3069 0.599976 12.5926 0.756347 12.758 1.01483L20.0411 12.3946C20.0767 12.4338 20.1093 12.4767 20.1382 12.523L20.7632 13.523C20.9799 13.8697 20.9356 14.319 20.6554 14.6168L12.6554 23.1168C12.4853 23.2975 12.2481 23.4 12 23.4C11.7518 23.4 11.5147 23.2975 11.3446 23.1168L3.34461 14.6168C3.06435 14.319 3.02006 13.8697 3.23679 13.523L3.86179 12.523C3.89071 12.4767 3.92326 12.4339 3.95888 12.3946L11.2419 1.01483C11.4074 0.756347 11.6931 0.599976 12 0.599976ZM5.57161 14.3567L11.1 20.2306V16.6055L5.57161 14.3567ZM11.1 14.6623L5.97809 12.5788L11.1 4.57582V14.6623ZM12.9 16.6055V20.2306L18.4284 14.3567L12.9 16.6055ZM18.0219 12.5788L12.9 14.6623V4.57582L18.0219 12.5788Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
