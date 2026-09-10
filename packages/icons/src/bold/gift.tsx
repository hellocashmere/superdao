import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface GiftBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function GiftBoldIcon({ ref, className, ...props }: GiftBoldIconProps) {
	return (
		<IconBase
			ref={ref}
			className={className}
			{...props}
		>
			<g>
				<g>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M18.1538 6.73077C19.1907 4.24239 17.3624 1.5 14.6667 1.5C13.6258 1.5 12.6833 1.92094 12 2.60187C11.3167 1.92094 10.3742 1.5 9.33333 1.5C6.63759 1.5 4.80933 4.24239 5.84615 6.73077C5.86052 6.76525 5.87537 6.79944 5.89067 6.83333H4.44444C3.09442 6.83333 2 7.92775 2 9.27778V11.5H10.8889V6.83333H13.1111V11.5H22V9.27778C22 7.92775 20.9056 6.83333 19.5556 6.83333H18.1093C18.1246 6.79944 18.1395 6.76525 18.1538 6.73077ZM13.1111 6.83333V5.27778C13.1111 4.41867 13.8076 3.72222 14.6667 3.72222C15.7767 3.72222 16.5295 4.85144 16.1026 5.87607C15.861 6.45574 15.2946 6.83333 14.6667 6.83333H13.1111ZM10.8889 6.83333H9.33333C8.70535 6.83333 8.13897 6.45574 7.89744 5.87607C7.47051 4.85144 8.22332 3.72222 9.33333 3.72222C10.192 3.72222 10.8881 4.41792 10.8889 5.2764L10.8889 6.83333Z"
						fill="currentColor"
					/>
					<path
						d="M20.2222 13.7222H13.1111V21.5H17.3333C18.9288 21.5 20.2222 20.2066 20.2222 18.6111V13.7222Z"
						fill="currentColor"
					/>
					<path
						d="M10.8889 21.5V13.7222H3.77779L3.77783 18.6111C3.77785 20.2066 5.07124 21.5 6.66672 21.5H10.8889Z"
						fill="currentColor"
					/>
				</g>
			</g>
		</IconBase>
	);
}
