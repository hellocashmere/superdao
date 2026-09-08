import type { ComponentPropsWithRef } from "react";

export interface ExpandIconProps extends ComponentPropsWithRef<"svg"> {}

export function ExpandIcon({ ref, className, ...props }: ExpandIconProps) {
	return (
		<svg
			{...props}
			ref={ref}
			width="9"
			height="13"
			viewBox="0 0 9 13"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden={props["aria-label"] ? undefined : true}
			focusable="false"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.26192 4.31944C7.57641 4.58901 8.04989 4.55259 8.31946 4.23809C8.58902 3.9236 8.5526 3.45012 8.23811 3.18056L4.73811 0.180558C4.45724 -0.0601858 4.04279 -0.0601859 3.76192 0.180558L0.26192 3.18056C-0.0525742 3.45012 -0.0889956 3.9236 0.180571 4.23809C0.450137 4.55259 0.923612 4.58901 1.23811 4.31944L4.25001 1.73781L7.26192 4.31944ZM1.23813 8.18059C0.92364 7.91102 0.450165 7.94744 0.180599 8.26193C-0.088968 8.57643 -0.0525469 9.0499 0.261947 9.31947L3.76195 12.3195C4.04281 12.5602 4.45727 12.5602 4.73813 12.3195L8.23813 9.31947C8.55263 9.0499 8.58905 8.57643 8.31948 8.26193C8.04992 7.94744 7.57644 7.91102 7.26195 8.18059L4.25004 10.7622L1.23813 8.18059Z"
				fill="currentColor"
			/>
		</svg>
	);
}
