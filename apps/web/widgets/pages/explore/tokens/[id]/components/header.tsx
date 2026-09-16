import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { Group16BoldIcon, PollBoldIcon } from "@superdao/icons/bold";
import { TabsList, TabsTrigger } from "@superdao/ui/components/tabs";

import { exploreRoutes } from "@/shared/lib/routes";
import { PageHeaderID } from "@/shared/ui/page-layout";

export interface TokenIDHeaderProps extends ComponentPropsWithRef<typeof PageHeaderID> {
	/**
	 * ID used to build the token tab routes.
	 */
	tokenID: number;
}

/**
 * Renders token identity and route navigation for its detail page.
 */
export function TokenIDHeader({ ref, className, tokenID, ...props }: TokenIDHeaderProps) {
	return (
		<PageHeaderID
			ref={ref}
			back={exploreRoutes.tokens()}
			data-slot="token-id-header"
			className={className}
			{...props}
		>
			<TabsList className="h-10 w-[300px] shrink-0 gap-1 rounded-lg p-1">
				<TabsTrigger
					className="h-8 rounded-[4px] px-3 py-1"
					value="wallets"
					nativeButton={false}
					render={<Link href={exploreRoutes.tokenWallets(tokenID)} />}
				>
					<Group16BoldIcon
						size={16}
						className="text-tabs-foreground"
					/>
					Wallets
				</TabsTrigger>
				<TabsTrigger
					className="h-8 rounded-[4px] px-3 py-1"
					value="insights"
					nativeButton={false}
					render={<Link href={exploreRoutes.tokenInsights(tokenID)} />}
				>
					<PollBoldIcon className="size-4" />
					Insights
				</TabsTrigger>
			</TabsList>
		</PageHeaderID>
	);
}
