import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface CopyBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function CopyBoldIcon({ ref, className, ...props }: CopyBoldIconProps) {
	return (
		<IconBase
			{...props}
			ref={ref}
			className={className}
		>
			<g>
				<g>
					<path
						d="M6.12598 5H15C17.2091 5 19 6.79086 19 9V17C19 17.309 18.9649 17.6098 18.8986 17.8987C20.675 17.4909 22 15.9002 22 14V6C22 3.79086 20.2091 2 18 2H9.99996C8.13612 2 6.57002 3.27477 6.12598 5Z"
						fill="currentColor"
					/>
					<path
						d="M2 10C2 7.79086 3.79086 6 6 6H14C16.2091 6 18 7.79086 18 10V18C18 20.2091 16.2091 22 14 22H6C3.79086 22 2 20.2091 2 18V10Z"
						fill="currentColor"
					/>
				</g>
			</g>
		</IconBase>
	);
}
