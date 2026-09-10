import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface Badge4IconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function Badge4Icon({ ref, className, ...props }: Badge4IconProps) {
	return (
		<IconBase
			ref={ref}
			className={className}
			{...props}
		>
			<g>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10C19 13.866 15.866 17 12 17C8.13401 17 5 13.866 5 10ZM12 1C7.02944 1 3 5.02944 3 10C3 12.6655 4.15875 15.0604 6 16.7083V23C6 23.3318 6.1646 23.642 6.43937 23.8281C6.71414 24.0141 7.0633 24.0517 7.37139 23.9285L12 22.077L16.6286 23.9285C16.9367 24.0517 17.2859 24.0141 17.5606 23.8281C17.8354 23.642 18 23.3318 18 23V16.7083C19.8412 15.0604 21 12.6655 21 10C21 5.02944 16.9706 1 12 1ZM16 18.0645C14.795 18.6633 13.4368 19 12 19C10.5632 19 9.20496 18.6633 8 18.0645V21.523L11.6286 20.0715C11.867 19.9762 12.133 19.9762 12.3714 20.0715L16 21.523V18.0645Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
