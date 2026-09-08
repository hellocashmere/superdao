import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface PassiveBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function PassiveBoldIcon({ ref, className, ...props }: PassiveBoldIconProps) {
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
					d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM15 11C15.8284 11 16.5 10.3284 16.5 9.5C16.5 8.67157 15.8284 8 15 8C14.1716 8 13.5 8.67157 13.5 9.5C13.5 10.3284 14.1716 11 15 11ZM7.25 14.5C6.69772 14.5 6.25 14.9477 6.25 15.5C6.25 16.0523 6.69772 16.5 7.25 16.5H16.75C17.3023 16.5 17.75 16.0523 17.75 15.5C17.75 14.9477 17.3022 14.5 16.7499 14.5H7.25ZM10.5 9.5C10.5 10.3284 9.82843 11 9 11C8.17157 11 7.5 10.3284 7.5 9.5C7.5 8.67157 8.17157 8 9 8C9.82843 8 10.5 8.67157 10.5 9.5Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
