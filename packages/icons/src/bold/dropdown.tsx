import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface DropdownBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function DropdownBoldIcon({ ref, className, ...props }: DropdownBoldIconProps) {
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
					d="M3.32875 8.06301C3.84627 7.41612 4.7902 7.31124 5.4371 7.82875L12.0001 13.0791L18.563 7.82875C19.2099 7.31124 20.1538 7.41612 20.6714 8.06301C21.1889 8.70991 21.084 9.65384 20.4371 10.1714L12.9371 16.1714C12.3893 16.6096 11.6108 16.6096 11.063 16.1714L3.56301 10.1714C2.91612 9.65384 2.81124 8.70991 3.32875 8.06301Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
