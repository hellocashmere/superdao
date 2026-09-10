import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface MessageBoldIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function MessageBoldIcon({ ref, className, ...props }: MessageBoldIconProps) {
	return (
		<IconBase
			ref={ref}
			className={className}
			{...props}
		>
			<g>
				<path
					d="M16.7 3H7.3C5.61984 3 4.77976 3 4.13803 3.32698C3.57354 3.6146 3.1146 4.07354 2.82698 4.63803C2.5 5.27976 2.5 6.11984 2.5 7.8V13.2C2.5 14.8802 2.5 15.7202 2.82698 16.362C3.1146 16.9265 3.57354 17.3854 4.13803 17.673C4.77976 18 5.63275 18 7.33871 18C7.39558 18 7.42401 18 7.4454 18.0109C7.46422 18.0205 7.47951 18.0358 7.4891 18.0546C7.5 18.076 7.5 18.104 7.5 18.16V20.1373C7.5 21.3489 7.5 21.9547 7.73959 22.2352C7.94749 22.4786 8.25934 22.6078 8.57846 22.5827C8.94624 22.5538 9.37463 22.1254 10.2314 21.2686L13.5 18H16.7C18.3802 18 19.2202 18 19.862 17.673C20.4265 17.3854 20.8854 16.9265 21.173 16.362C21.5 15.7202 21.5 14.8802 21.5 13.2V7.8C21.5 6.11984 21.5 5.27976 21.173 4.63803C20.8854 4.07354 20.4265 3.6146 19.862 3.32698C19.2202 3 18.3802 3 16.7 3Z"
					fill="currentColor"
				/>
			</g>
		</IconBase>
	);
}
