import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { DappHighlights } from "./components/highlights";
import { DappWalletsTable } from "./components/table/table";

export interface DappWalletsTabProps extends ComponentPropsWithRef<"div"> {
	/**
	 * Backend-provided ID of the dapp whose audience is displayed.
	 */
	dappID: number;
}

/**
 * Composes audience highlights and the dapp wallet directory.
 */
export function DappWalletsTab({ ref, className, dappID, ...props }: DappWalletsTabProps) {
	return (
		<div
			ref={ref}
			data-slot="dapp-wallets-tab"
			className={cn("space-y-5", className)}
			{...props}
		>
			<DappHighlights dappID={dappID} />
			<DappWalletsTable dappID={dappID} />
		</div>
	);
}
