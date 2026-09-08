import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface MessageRIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function MessageRIcon({ ref, className, ...props }: MessageRIconProps) {
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
					d="M12.5206 3.50213C17.2728 3.24938 21.1781 6.59673 21.4021 10.8087C21.6261 15.0207 18.098 18.7633 13.3457 19.016C11.6762 19.1048 9.63576 18.7872 8.36251 18.164L7.98014 17.9769L5.46718 18.8935L6.19107 16.499L5.87593 16.0913C5.02934 14.996 4.55 13.3218 4.46425 11.7096C4.24023 7.49759 7.76841 3.75488 12.5206 3.50213ZM23.3993 10.7025C23.1089 5.24337 18.1197 1.20151 12.4144 1.50495C6.70905 1.8084 2.17673 6.35667 2.46708 11.8158C2.55683 13.5034 3.01875 15.4053 3.9859 16.8819L2.97412 20.2288C2.86452 20.5913 2.96914 20.9847 3.24437 21.2448C3.5196 21.505 3.9182 21.5874 4.27401 21.4576L7.88293 20.1412C9.51536 20.8242 11.6959 21.1066 13.452 21.0132C19.1573 20.7098 23.6896 16.1617 23.3993 10.7025Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
