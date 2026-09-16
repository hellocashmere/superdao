import type { ComponentPropsWithRef } from "react";

import type { ChartConfig } from "@superdao/ui/components/chart";

import type { DappChartDatumView } from "@/entities/dapp";
import { BarChartCard } from "@/shared/ui/charts";

const walletProfileChartConfig = { value: { label: "Wallets", color: "var(--chart-2)" } } satisfies ChartConfig;

export interface DappWalletProfileInsightsProps extends ComponentPropsWithRef<"section"> {
	interests: readonly DappChartDatumView[];
	personas: readonly DappChartDatumView[];
	superrank: readonly DappChartDatumView[];
}

/**
 * Renders wallet profile distributions for the dapp audience.
 */
export function DappWalletProfileInsights({
	ref,
	className,
	interests,
	personas,
	superrank,
	...props
}: DappWalletProfileInsightsProps) {
	return (
		<section
			ref={ref}
			data-slot="dapp-wallet-profile-insights"
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
