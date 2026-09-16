import type { ComponentPropsWithRef } from "react";

import type { ChartConfig } from "@superdao/ui/components/chart";

import type { NftCollectionChartDatumView } from "@/entities/nft-collection";
import { BarChartCard } from "@/shared/ui/charts";

const walletProfileChartConfig = { value: { label: "Wallets", color: "var(--chart-2)" } } satisfies ChartConfig;

export interface CollectionWalletProfileInsightsProps extends ComponentPropsWithRef<"section"> {
	interests: readonly NftCollectionChartDatumView[];
	personas: readonly NftCollectionChartDatumView[];
	superrank: readonly NftCollectionChartDatumView[];
}

/**
 * Renders wallet profile distributions for the collection audience.
 */
export function CollectionWalletProfileInsights({
	ref,
	className,
	interests,
	personas,
	superrank,
	...props
}: CollectionWalletProfileInsightsProps) {
	return (
		<section
			ref={ref}
			data-slot="collection-wallet-profile-insights"
			className={className}
			{...props}
		>
			<h2 className="flex h-14 items-center text-xl/6 font-bold">Wallet profile</h2>
			<div className="grid gap-5 lg:grid-cols-2">
				<BarChartCard
					title="Superrank"
					data={superrank}
					config={walletProfileChartConfig}
				/>
				<BarChartCard
					title="Interests"
					data={interests}
					config={walletProfileChartConfig}
				/>
				<BarChartCard
					className="lg:col-span-2"
					title="Personas"
					data={personas}
					config={walletProfileChartConfig}
				/>
			</div>
		</section>
	);
}
