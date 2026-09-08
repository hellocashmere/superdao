import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface CloseIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function CloseIcon({ ref, className, ...props }: CloseIconProps) {
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
					d="M4.54289 4.54289C4.93342 4.15237 5.56658 4.15237 5.95711 4.54289L12 10.5858L18.0429 4.54289C18.4334 4.15237 19.0666 4.15237 19.4571 4.54289C19.8476 4.93342 19.8476 5.56658 19.4571 5.95711L13.4142 12L19.4571 18.0429C19.8476 18.4334 19.8476 19.0666 19.4571 19.4571C19.0666 19.8476 18.4334 19.8476 18.0429 19.4571L12 13.4142L5.95711 19.4571C5.56658 19.8476 4.93342 19.8476 4.54289 19.4571C4.15237 19.0666 4.15237 18.4334 4.54289 18.0429L10.5858 12L4.54289 5.95711C4.15237 5.56658 4.15237 4.93342 4.54289 4.54289Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
