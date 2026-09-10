import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface CopyrightBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function CopyrightBoldIcon({ ref, className, ...props }: CopyrightBoldIconProps) {
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
					d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM9 12C9 10.3431 10.3431 9 12 9C12.8959 9 13.6991 9.39144 14.2503 10.0159C14.6157 10.43 15.2477 10.4694 15.6617 10.1039C16.0758 9.73845 16.1152 9.10651 15.7497 8.69244C14.835 7.65607 13.4935 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C13.4935 17 14.835 16.3439 15.7497 15.3076C16.1152 14.8935 16.0758 14.2616 15.6617 13.8961C15.2477 13.5306 14.6157 13.57 14.2503 13.9841C13.6991 14.6086 12.8959 15 12 15C10.3431 15 9 13.6569 9 12Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
