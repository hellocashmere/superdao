import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface UnblockBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function UnblockBoldIcon({ ref, className, ...props }: UnblockBoldIconProps) {
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
					d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM7 12C7 11.6667 7.2 11 8 11H16C16.3333 11 17 11.2 17 12C17 12.8 16.3333 13 16 13H8C7.66667 13 7 12.8 7 12Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
