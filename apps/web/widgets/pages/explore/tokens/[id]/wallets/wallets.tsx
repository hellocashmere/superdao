import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { TokenHighlights } from "./components/highlights";
import { TokenWalletsTable } from "./components/table/table";

export interface TokenWalletsTabProps extends ComponentPropsWithRef<"div"> {
	tokenID: number;
}

/**
 * Composes audience highlights and the token wallet directory.
 */
export function TokenWalletsTab({ ref, className, tokenID, ...props }: TokenWalletsTabProps) {
	return (
		<div
			ref={ref}
			data-slot="token-wallets-tab"
			className={cn("space-y-5", className)}
			{...props}
		>
			<TokenHighlights tokenID={tokenID} />
			<TokenWalletsTable tokenID={tokenID} />
		</div>
	);
}
