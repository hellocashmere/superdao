import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface UserFollowedIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function UserFollowedIcon({ ref, className, ...props }: UserFollowedIconProps) {
	return (
		<IconBase
			{...props}
			ref={ref}
			className={className}
		>
			<g>
				<g>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M12 0.5C9.37665 0.5 7.25 2.62665 7.25 5.25C7.25 7.87335 9.37665 10 12 10C14.6234 10 16.75 7.87335 16.75 5.25C16.75 2.62665 14.6234 0.5 12 0.5ZM9.25 5.25C9.25 3.73122 10.4812 2.5 12 2.5C13.5188 2.5 14.75 3.73122 14.75 5.25C14.75 6.76878 13.5188 8 12 8C10.4812 8 9.25 6.76878 9.25 5.25Z"
						fill="currentColor"
					/>
					<path
						d="M1.5 18.5C1.5 16.2774 4.13498 12 12 12C12.5523 12 13 12.4477 13 13C13 13.5523 12.5523 14 12 14C4.86502 14 3.5 17.7226 3.5 18.5C3.5 19.0228 3.66989 19.3807 3.89461 19.6054C4.11933 19.8301 4.47725 20 5 20H10.5C11.0523 20 11.5 20.4477 11.5 21C11.5 21.5523 11.0523 22 10.5 22H5C4.02275 22 3.13067 21.6699 2.48039 21.0196C1.83011 20.3693 1.5 19.4772 1.5 18.5Z"
						fill="currentColor"
					/>
					<path
						d="M23.7071 13.7929C24.0976 14.1834 24.0976 14.8166 23.7071 15.2071L18.2071 20.7071C17.8166 21.0976 17.1834 21.0976 16.7929 20.7071L14.2929 18.2071C13.9024 17.8166 13.9024 17.1834 14.2929 16.7929C14.6834 16.4024 15.3166 16.4024 15.7071 16.7929L17.5 18.5858L22.2929 13.7929C22.6834 13.4024 23.3166 13.4024 23.7071 13.7929Z"
						fill="currentColor"
					/>
				</g>
			</g>
		</IconBase>
	);
}
