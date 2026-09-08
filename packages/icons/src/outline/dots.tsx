import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface DotsIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function DotsIcon({ ref, className, ...props }: DotsIconProps) {
	return (
		<IconBase
			{...props}
			ref={ref}
			className={className}
		>
			<g>
				<g>
					<path
						d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z"
						fill="currentColor"
					/>
					<path
						d="M13.5 12C13.5 13.1046 12.6046 14 11.5 14C10.3954 14 9.5 13.1046 9.5 12C9.5 10.8954 10.3954 10 11.5 10C12.6046 10 13.5 10.8954 13.5 12Z"
						fill="currentColor"
					/>
					<path
						d="M20 12C20 13.1046 19.1046 14 18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12Z"
						fill="currentColor"
					/>
				</g>
			</g>
		</IconBase>
	);
}
