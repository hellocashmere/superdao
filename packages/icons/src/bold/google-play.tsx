import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface GooglePlayBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function GooglePlayBoldIcon({ ref, className, ...props }: GooglePlayBoldIconProps) {
	return (
		<IconBase
			ref={ref}
			className={className}
			{...props}
		>
			<g>
				<g>
					<path
						d="M7.75185 2.73703L17.4109 8.21288L14.4636 11.3337L6.23456 2.61981C6.70564 2.43794 7.2499 2.45249 7.75185 2.73703Z"
						fill="currentColor"
					/>
					<path
						d="M18.2306 8.67753L21.0129 10.2548C22.329 11.0009 22.329 12.9991 21.0129 13.7452L18.2306 15.3225L15.093 12L18.2306 8.67753Z"
						fill="currentColor"
					/>
					<path
						d="M5.48115 3.15451C5.18602 3.49798 5 3.95653 5 4.48191V19.5177C5 20.0431 5.18602 20.5017 5.48111 20.8452L13.8343 11.9998L5.48115 3.15451Z"
						fill="currentColor"
					/>
					<path
						d="M7.75184 21.2629C7.2499 21.5475 6.7056 21.562 6.23456 21.3802L14.4636 12.6662L17.4109 15.7871L7.75184 21.2629Z"
						fill="currentColor"
					/>
				</g>
			</g>
		</IconBase>
	);
}
