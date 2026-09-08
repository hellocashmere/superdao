import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface ZapperBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function ZapperBoldIcon({ ref, className, ...props }: ZapperBoldIconProps) {
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
					d="M3.68157 5.5891L17.2875 5.51001C18.055 5.50555 18.5412 6.33155 18.1648 7.0004L15.3395 12.0212L22.264 11.9817C23.0347 11.9773 23.5204 12.8096 23.1376 13.4784L20.3297 18.3836L6.6474 18.4868C5.87483 18.4927 5.38775 17.6575 5.7732 16.988L8.63044 12.0246L1.72377 12.0214C0.955816 12.0211 0.474838 11.1911 0.856349 10.5247L3.68157 5.5891Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
