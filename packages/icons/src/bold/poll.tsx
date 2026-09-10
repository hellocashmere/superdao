import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface PollBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function PollBoldIcon({ ref, className, ...props }: PollBoldIconProps) {
	return (
		<IconBase
			ref={ref}
			className={className}
			{...props}
		>
			<g>
				<g>
					<path
						d="M12 2C13.1046 2 14 2.89543 14 4V19C14 20.1046 13.1046 21 12 21C10.8954 21 10 20.1046 10 19V4C10 2.89543 10.8954 2 12 2Z"
						fill="currentColor"
					/>
					<path
						d="M5 8C6.10457 8 7 8.89543 7 10V19C7 20.1046 6.10457 21 5 21C3.89543 21 3 20.1046 3 19V10C3 8.89543 3.89543 8 5 8Z"
						fill="currentColor"
					/>
					<path
						d="M21 10C21 8.89543 20.1046 8 19 8C17.8954 8 17 8.89543 17 10V19C17 20.1046 17.8954 21 19 21C20.1046 21 21 20.1046 21 19V10Z"
						fill="currentColor"
					/>
				</g>
			</g>
		</IconBase>
	);
}
