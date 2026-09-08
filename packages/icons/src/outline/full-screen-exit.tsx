import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface FullScreenExitIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function FullScreenExitIcon({ ref, className, ...props }: FullScreenExitIconProps) {
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
						d="M20.5 9.5C20.5 10.0523 20.0523 10.5 19.5 10.5H14.5C13.9477 10.5 13.5 10.0523 13.5 9.5V4.5C13.5 3.94772 13.9477 3.5 14.5 3.5C15.0523 3.5 15.5 3.94772 15.5 4.5V7.08579L19.7929 2.79289C20.1834 2.40237 20.8166 2.40237 21.2071 2.79289C21.5976 3.18342 21.5976 3.81658 21.2071 4.20711L16.9142 8.5H19.5C20.0523 8.5 20.5 8.94772 20.5 9.5Z"
						fill="currentColor"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M4.20711 21.2071C3.81658 21.5976 3.18342 21.5976 2.79289 21.2071C2.40237 20.8166 2.40237 20.1834 2.79289 19.7929L7.08579 15.5H4.5C3.94772 15.5 3.5 15.0523 3.5 14.5C3.5 13.9477 3.94772 13.5 4.5 13.5H9.5C10.0523 13.5 10.5 13.9477 10.5 14.5V19.5C10.5 20.0523 10.0523 20.5 9.5 20.5C8.94772 20.5 8.5 20.0523 8.5 19.5V16.9142L4.20711 21.2071Z"
						fill="currentColor"
					/>
				</g>
			</g>
		</IconBase>
	);
}
