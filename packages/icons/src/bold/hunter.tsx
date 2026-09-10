import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface HunterBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function HunterBoldIcon({ ref, className, ...props }: HunterBoldIconProps) {
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
					d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12ZM23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
