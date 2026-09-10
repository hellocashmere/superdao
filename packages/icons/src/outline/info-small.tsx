import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface InfoSmallIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function InfoSmallIcon({ ref, className, ...props }: InfoSmallIconProps) {
	return (
		<IconBase
			ref={ref}
			className={className}
			{...props}
		>
			<g transform="scale(1.5)">
				<path
					d="M8 6.88372C8.411 6.88372 8.74419 7.2169 8.74419 7.62791V11.7209C8.74419 12.1319 8.411 12.4651 8 12.4651C7.589 12.4651 7.25581 12.1319 7.25581 11.7209V7.62791C7.25581 7.2169 7.589 6.88372 8 6.88372Z"
					fill="currentColor"
				/>
				<path
					d="M8 5.39535C8.51375 5.39535 8.93023 4.97887 8.93023 4.46512C8.93023 3.95136 8.51375 3.53488 8 3.53488C7.48625 3.53488 7.06977 3.95136 7.06977 4.46512C7.06977 4.97887 7.48625 5.39535 8 5.39535Z"
					fill="currentColor"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM8 1.48837C4.40373 1.48837 1.48837 4.40373 1.48837 8C1.48837 11.5963 4.40373 14.5116 8 14.5116C11.5963 14.5116 14.5116 11.5963 14.5116 8C14.5116 4.40373 11.5963 1.48837 8 1.48837Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
