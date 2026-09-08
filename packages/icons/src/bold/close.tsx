import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface CloseBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function CloseBoldIcon({ ref, className, ...props }: CloseBoldIconProps) {
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
					d="M5.61612 5.61612C6.10427 5.12796 6.89573 5.12796 7.38388 5.61612L12 10.2322L16.6161 5.61612C17.1043 5.12796 17.8957 5.12796 18.3839 5.61612C18.872 6.10427 18.872 6.89573 18.3839 7.38388L13.7678 12L18.3839 16.6161C18.872 17.1043 18.872 17.8957 18.3839 18.3839C17.8957 18.872 17.1043 18.872 16.6161 18.3839L12 13.7678L7.38388 18.3839C6.89573 18.872 6.10427 18.872 5.61612 18.3839C5.12796 17.8957 5.12796 17.1043 5.61612 16.6161L10.2322 12L5.61612 7.38388C5.12796 6.89573 5.12796 6.10427 5.61612 5.61612Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
