import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { Group16BoldIcon, PollBoldIcon } from "@superdao/icons/bold";
import { TabsList, TabsTrigger } from "@superdao/ui/components/tabs";

import { exploreRoutes } from "@/shared/lib/routes";
import { PageHeaderID } from "@/shared/ui/page-layout";

export interface DappIDHeaderProps extends ComponentPropsWithRef<typeof PageHeaderID> {
	/**
	 * ID used to build the dapp tab routes.
	 */
	dappID: number;
}

/**
 * Renders dapp identity, audience count, and help action.
 */
export function DappIDHeader({ ref, className, dappID, ...props }: DappIDHeaderProps) {
	return (
		<PageHeaderID
			ref={ref}
			back={exploreRoutes.dapps()}
			data-slot="dapp-id-header"
			className={className}
			{...props}
		>
			<TabsList className="h-10 w-75 shrink-0 gap-1 rounded-lg p-1">
				<TabsTrigger
					className="h-8 rounded-lg px-3 py-1"
					value="wallets"
					nativeButton={false}
					render={<Link href={exploreRoutes.dappWallets(dappID)} />}
				>
					<Group16BoldIcon
						size={16}
						className="text-tabs-foreground"
					/>
					Wallets
				</TabsTrigger>
				<TabsTrigger
					className="h-8 rounded-lg px-3 py-1"
					value="insights"
					nativeButton={false}
					render={<Link href={exploreRoutes.dappInsights(dappID)} />}
				>
					<PollBoldIcon className="size-4" />
					Insights
				</TabsTrigger>
			</TabsList>
		</PageHeaderID>
	);
}
