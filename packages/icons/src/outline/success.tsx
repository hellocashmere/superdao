import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface SuccessIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function SuccessIcon({ ref, className, ...props }: SuccessIconProps) {
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
					d="M20.9375 12C20.9375 16.936 16.936 20.9375 12 20.9375C7.06395 20.9375 3.0625 16.936 3.0625 12C3.0625 7.06395 7.06395 3.0625 12 3.0625C16.936 3.0625 20.9375 7.06395 20.9375 12ZM23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM16.5105 9.9792C16.9132 9.57648 16.9132 8.92352 16.5105 8.5208C16.1077 8.11807 15.4548 8.11807 15.052 8.5208L10.2812 13.2916L8.6042 11.6145C8.20148 11.2118 7.54852 11.2118 7.1458 11.6145C6.74307 12.0173 6.74307 12.6702 7.1458 13.073L9.55205 15.4792C9.95477 15.8819 10.6077 15.8819 11.0105 15.4792L16.5105 9.9792Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
