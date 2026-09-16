import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { Group16BoldIcon, PollBoldIcon } from "@superdao/icons/bold";
import { TabsList, TabsTrigger } from "@superdao/ui/components/tabs";

import { audienceRoutes } from "@/shared/lib/routes";
import { PageHeaderID } from "@/shared/ui/page-layout";

export interface AudienceIDHeaderProps extends ComponentPropsWithRef<typeof PageHeaderID> {
	/**
	 * ID used to build the audience tab routes.
	 */
	audienceID: string;
}

/**
 * Renders audience identity and route navigation for its detail page.
 */
export function AudienceIDHeader({ ref, className, audienceID, ...props }: AudienceIDHeaderProps) {
	return (
		<PageHeaderID
			ref={ref}
			back="/"
			data-slot="audience-id-header"
			className={className}
			{...props}
		>
			<TabsList className="h-10 w-75 shrink-0 gap-1 rounded-lg p-1">
				<TabsTrigger
					className="h-8 rounded-lg px-3 py-1"
					value="wallets"
					nativeButton={false}
					render={<Link href={audienceRoutes.wallets(audienceID)} />}
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
					render={<Link href={audienceRoutes.insights(audienceID)} />}
				>
					<PollBoldIcon className="size-4" />
					Insights
				</TabsTrigger>
			</TabsList>
		</PageHeaderID>
	);
}
