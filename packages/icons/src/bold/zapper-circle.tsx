import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface ZapperCircleBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function ZapperCircleBoldIcon({ ref, className, ...props }: ZapperCircleBoldIconProps) {
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
					d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM15.6145 8.00934L6.60778 8.05483L5.02091 10.4633C4.58292 11.128 5.05949 12.0131 5.85556 12.0134L10.1132 12.0151L8.50954 14.4354C8.06744 15.1026 8.54933 15.9929 9.3497 15.9877L18.4002 15.9284L19.9725 13.5421C20.4118 12.8753 19.931 11.9879 19.1325 11.9919L14.8655 12.013L16.4589 9.55298C16.8911 8.88573 16.4095 8.00533 15.6145 8.00934Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
