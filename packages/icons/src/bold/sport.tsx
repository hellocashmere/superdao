import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface SportBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function SportBoldIcon({ ref, className, ...props }: SportBoldIconProps) {
	return (
		<IconBase
			{...props}
			ref={ref}
			className={className}
		>
			<g>
				<g>
					<path
						d="M22.7018 10.9755C19.2582 10.7012 17.0303 9.86613 15.5821 8.41785C14.1338 6.96957 13.2987 4.74172 13.0244 1.29814C18.1437 1.7821 22.2178 5.85617 22.7018 10.9755Z"
						fill="currentColor"
					/>
					<path
						d="M22.7057 12.9817C18.9702 12.7048 16.1294 11.7936 14.1679 9.83206C12.2063 7.87052 11.2951 5.02976 11.0182 1.29419C5.8646 1.76077 1.76077 5.8646 1.29419 11.0182C5.02976 11.2951 7.87052 12.2063 9.83207 14.1679C11.7936 16.1294 12.7048 18.9702 12.9817 22.7057C18.1353 22.2391 22.2391 18.1353 22.7057 12.9817Z"
						fill="currentColor"
					/>
					<path
						d="M1.29814 13.0244C1.7821 18.1437 5.85617 22.2178 10.9755 22.7018C10.7012 19.2582 9.86614 17.0303 8.41785 15.5821C6.96957 14.1338 4.74173 13.2987 1.29814 13.0244Z"
						fill="currentColor"
					/>
				</g>
			</g>
		</IconBase>
	);
}
