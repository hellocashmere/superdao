import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface UserrRemoveBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function UserrRemoveBoldIcon({ ref, className, ...props }: UserrRemoveBoldIconProps) {
	return (
		<IconBase
			ref={ref}
			className={className}
			{...props}
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
						d="M18 21.5C21.0376 21.5 23.5 19.0376 23.5 16C23.5 12.9624 21.0376 10.5 18 10.5C14.9624 10.5 12.5 12.9624 12.5 16C12.5 19.0376 14.9624 21.5 18 21.5ZM17.2071 13.7929C16.8166 13.4024 16.1834 13.4024 15.7929 13.7929C15.4024 14.1834 15.4024 14.8166 15.7929 15.2071L16.5858 16L15.7929 16.7929C15.4024 17.1834 15.4024 17.8166 15.7929 18.2071C16.1834 18.5976 16.8166 18.5976 17.2071 18.2071L18 17.4142L18.7929 18.2071C19.1834 18.5976 19.8166 18.5976 20.2071 18.2071C20.5976 17.8166 20.5976 17.1834 20.2071 16.7929L19.4142 16L20.2071 15.2071C20.5976 14.8166 20.5976 14.1834 20.2071 13.7929C19.8166 13.4024 19.1834 13.4024 18.7929 13.7929L18 14.5858L17.2071 13.7929Z"
						fill="currentColor"
					/>
				</g>
			</g>
		</IconBase>
	);
}
