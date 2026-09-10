import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface ZapperIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function ZapperIcon({ ref, className, ...props }: ZapperIconProps) {
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
					d="M16.7151 7.01002L4.95853 7.07884L2.71827 11.0198L10.6343 11.0234L7.22528 16.9868L19.0513 16.897L21.2756 12.9838L13.3513 13.0294L16.7151 7.01002ZM17.5613 5.00503C18.7105 4.9983 19.4401 6.23349 18.8795 7.23674L16.7711 11.0097L22.1292 10.9789C23.2832 10.9723 24.0122 12.2169 23.4419 13.2202L20.2199 18.8882L6.37114 18.9934C5.21426 19.0021 4.48335 17.7533 5.05751 16.749L7.18815 13.0219L1.85845 13.0195C0.708517 13.0189 -0.0131772 11.7779 0.5551 10.7782L3.791 5.08564L17.5613 5.00503Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
