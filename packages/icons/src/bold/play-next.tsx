import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface PlayNextBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function PlayNextBoldIcon({ ref, className, ...props }: PlayNextBoldIconProps) {
	return (
		<IconBase
			{...props}
			ref={ref}
			className={className}
		>
			<g>
				<g>
					<path
						d="M17.57 9.94204L7.13479 3.6809C5.94508 2.96707 5.35023 2.61016 4.86078 2.65578C4.434 2.69557 4.04463 2.91603 3.79094 3.26152C3.5 3.65774 3.5 4.35146 3.5 5.73888V18.2612C3.5 19.6486 3.5 20.3423 3.79094 20.7385C4.04463 21.084 4.434 21.3045 4.86078 21.3443C5.35023 21.3899 5.94508 21.033 7.13479 20.3192L17.57 14.058C18.7014 13.3792 19.267 13.0398 19.4589 12.6009C19.6264 12.2178 19.6264 11.7822 19.4589 11.3992C19.267 10.9602 18.7014 10.6208 17.57 9.94204Z"
						fill="currentColor"
					/>
					<path
						d="M17.5 4.05252C17.5 3.27794 18.1716 2.65002 19 2.65002C19.8284 2.65002 20.5 3.27795 20.5 4.05252V19.9475C20.5 20.7221 19.8284 21.35 19 21.35C18.1716 21.35 17.5 20.7221 17.5 19.9475V4.05252Z"
						fill="currentColor"
					/>
				</g>
			</g>
		</IconBase>
	);
}
