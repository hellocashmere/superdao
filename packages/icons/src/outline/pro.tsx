import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface ProIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function ProIcon({ ref, className, ...props }: ProIconProps) {
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
					d="M12 2C12.3244 2 12.6286 2.15731 12.8161 2.42198L16.4929 7.61286L21.429 4.17909C21.7557 3.95183 22.186 3.93991 22.5248 4.14876C22.8636 4.3576 23.0463 4.74745 22.99 5.14142L20.99 19.1414C20.9196 19.6341 20.4977 20 20 20H4.00003C3.50238 20 3.08046 19.6341 3.01008 19.1414L1.01008 5.14142C0.953799 4.74745 1.13649 4.3576 1.47526 4.14876C1.81403 3.93991 2.2444 3.95183 2.5711 4.17909L7.50713 7.61286L11.184 2.42198C11.3715 2.15731 11.6757 2 12 2ZM12 4.73005L8.56606 9.57802C8.24874 10.026 7.62962 10.1344 7.17897 9.82091L3.31487 7.13284L4.86733 18H19.1327L20.6852 7.13284L16.8211 9.82091C16.3704 10.1344 15.7513 10.026 15.434 9.57802L12 4.73005Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
