import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface UserExportBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function UserExportBoldIcon({ ref, className, ...props }: UserExportBoldIconProps) {
	return (
		<IconBase
			{...props}
			ref={ref}
			className={className}
		>
			<g>
				<g>
					<path
						d="M16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6Z"
						fill="currentColor"
					/>
					<path
						d="M11.6527 12.0029C4.43804 12.1243 2.5 16.0234 2.5 17.5C2.5 19 3.5 20 5 20H11.6546C10.9232 18.8423 10.5 17.4706 10.5 16C10.5 14.5307 10.9225 13.16 11.6527 12.0029Z"
						fill="currentColor"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M18 21.5C21.0376 21.5 23.5 19.0376 23.5 16C23.5 12.9624 21.0376 10.5 18 10.5C14.9624 10.5 12.5 12.9624 12.5 16C12.5 19.0376 14.9624 21.5 18 21.5ZM17.8335 13C18.2017 13 18.5001 13.2985 18.5001 13.6667L18.5002 16.8103L19.5476 15.8435C19.8181 15.5937 20.2399 15.6106 20.4896 15.8811C20.7393 16.1517 20.7225 16.5734 20.4519 16.8232L18.2853 18.8232C18.0299 19.0589 17.6363 19.0589 17.3809 18.8232L15.2143 16.8232C14.9438 16.5734 14.9269 16.1517 15.1767 15.8811C15.4264 15.6106 15.8482 15.5937 16.1187 15.8435L17.1669 16.8111L17.1668 13.6667C17.1668 13.2985 17.4653 13 17.8335 13Z"
						fill="currentColor"
					/>
				</g>
			</g>
		</IconBase>
	);
}
