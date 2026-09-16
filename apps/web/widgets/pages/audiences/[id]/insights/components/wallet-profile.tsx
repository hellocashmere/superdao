import type { ComponentPropsWithRef } from "react";

import type { ChartConfig } from "@superdao/ui/components/chart";

import type { LabelChartDatumView } from "@/entities/label";
import { BarChartCard } from "@/shared/ui/charts";

const walletProfileChartConfig = {
	value: {
		label: "Wallets",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export interface AudienceWalletProfileInsightsProps extends ComponentPropsWithRef<"section"> {
	interests: readonly LabelChartDatumView[];
	personas: readonly LabelChartDatumView[];
	superrank: readonly LabelChartDatumView[];
}

/**
 * Renders wallet profile distributions for the audience.
 */
export function AudienceWalletProfileInsights({
	ref,
	className,
	interests,
	personas,
	superrank,
	...props
}: AudienceWalletProfileInsightsProps) {
	return (
		<section
			ref={ref}
			data-slot="audience-wallet-profile-insights"
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
