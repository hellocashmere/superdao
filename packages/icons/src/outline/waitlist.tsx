import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface WaitlistIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function WaitlistIcon({ ref, className, ...props }: WaitlistIconProps) {
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
					d="M3 2.5C3 1.94772 3.44772 1.5 4 1.5H20C20.5523 1.5 21 1.94772 21 2.5C21 3.05228 20.5523 3.5 20 3.5H19V7.5C19 9.1148 18.029 10.5712 16.5385 11.1923L14.6 12L16.5385 12.8077C18.029 13.4288 19 14.8852 19 16.5V20.5H20C20.5523 20.5 21 20.9477 21 21.5C21 22.0523 20.5523 22.5 20 22.5H4C3.44772 22.5 3 22.0523 3 21.5C3 20.9477 3.44772 20.5 4 20.5H5V16.5C5 14.8852 5.97095 13.4288 7.46154 12.8077L9.4 12L7.46154 11.1923C5.97095 10.5712 5 9.1148 5 7.5V3.5H4C3.44772 3.5 3 3.05228 3 2.5ZM7 20.5H17V16.5C17 15.6926 16.5145 14.9644 15.7692 14.6538L12 13.0833L8.23077 14.6538C7.48548 14.9644 7 15.6926 7 16.5V20.5ZM7 3.5H17V7.5C17 8.3074 16.5145 9.03561 15.7692 9.34615L12 10.9167L8.23077 9.34615C7.48548 9.03561 7 8.3074 7 7.5V3.5Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
