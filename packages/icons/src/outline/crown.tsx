import type { ComponentPropsWithRef } from "react";

import { IconBase } from "../shared/icon";

export interface CrownIconProps extends ComponentPropsWithRef<typeof IconBase> {}

export function CrownIcon({ ref, className, ...props }: CrownIconProps) {
	return (
		<IconBase
			{...props}
			ref={ref}
			className={className}
		>
			<g>
				<g>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M12 2C12.3243 2 12.6285 2.16762 12.816 2.44963L16.4929 7.98066L21.4289 4.32188C21.7556 4.07972 22.186 4.06703 22.5247 4.28956C22.8635 4.51209 23.0462 4.92748 22.9899 5.34727L20.9899 20.2647C20.9195 20.7896 20.4976 21.1795 20 21.1795H4.00002C3.50237 21.1795 3.08045 20.7896 3.01008 20.2647L1.01008 5.34727C0.953799 4.92748 1.13649 4.51209 1.47526 4.28956C1.81403 4.06703 2.24439 4.07972 2.57109 4.32188L7.50712 7.98066L11.184 2.44963C11.3715 2.16762 11.6757 2 12 2ZM12 4.90894L8.56603 10.0746C8.24872 10.5519 7.6296 10.6674 7.17895 10.3334L3.31487 7.46918L4.86732 19.0484H19.1327L20.6851 7.46918L16.8211 10.3334C16.3704 10.6674 15.7513 10.5519 15.434 10.0746L12 4.90894Z"
						fill="currentColor"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M19.9999 16.9174H3.99999V14.7863H19.9999V16.9174Z"
						fill="currentColor"
					/>
				</g>
			</g>
		</IconBase>
	);
}
