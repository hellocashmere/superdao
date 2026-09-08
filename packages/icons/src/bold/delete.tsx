import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface DeleteBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function DeleteBoldIcon({ ref, className, ...props }: DeleteBoldIconProps) {
	return (
		<IconBase
			{...props}
			ref={ref}
			className={className}
		>
			<g>
				<g>
					<path
						d="M5.08023 17.1624L4 6H20L18.9198 17.1624C18.7715 18.6943 18.6974 19.4603 18.3513 20.0392C18.0465 20.5491 17.5972 20.9571 17.0604 21.2113C16.4508 21.5 15.6812 21.5 14.1421 21.5H9.85791C8.31878 21.5 7.54922 21.5 6.93964 21.2113C6.40277 20.9571 5.95346 20.5491 5.64867 20.0392C5.30261 19.4603 5.22848 18.6943 5.08023 17.1624Z"
						fill="currentColor"
					/>
					<path
						d="M8.5 5.50006C8.5 3.56706 10.067 2.00006 12 2.00006C13.933 2.00006 15.5 3.56706 15.5 5.50006V6.00006H8.5V5.50006Z"
						fill="currentColor"
					/>
					<path
						d="M2 6H4M4 6L5.08023 17.1624C5.22848 18.6943 5.30261 19.4603 5.64867 20.0392C5.95346 20.5491 6.40277 20.9571 6.93964 21.2113C7.54922 21.5 8.31878 21.5 9.85791 21.5H14.1421C15.6812 21.5 16.4508 21.5 17.0604 21.2113C17.5972 20.9571 18.0465 20.5491 18.3513 20.0392C18.6974 19.4603 18.7715 18.6943 18.9198 17.1624L20 6M4 6H20M20 6H22M15.5 6.00006V5.50006C15.5 3.56706 13.933 2.00006 12 2.00006C10.067 2.00006 8.5 3.56706 8.5 5.50006V6.00006H15.5Z"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
			</g>
		</IconBase>
	);
}
