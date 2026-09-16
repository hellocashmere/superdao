import type { ComponentPropsWithRef } from "react";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import { Avatar, AvatarFallback, AvatarImage } from "@superdao/ui/components/avatar";
import { Card } from "@superdao/ui/components/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@superdao/ui/components/table";

import type { LabelInfluencerView, LabelInsightMetricView } from "@/entities/label";
import { MetricCard } from "@/shared/ui/metric-card";

export interface AudienceContactsInsightsProps extends ComponentPropsWithRef<"section"> {
	influencers: readonly LabelInfluencerView[];
	metrics: readonly LabelInsightMetricView[];
}

/**
 * Renders contact metrics and influential Twitter profiles.
 */
export function AudienceContactsInsights({
	ref,
	className,
	influencers,
	metrics,
	...props
}: AudienceContactsInsightsProps) {
	const { compact, currency, number, percentValue } = useNumberFormatter();

	return (
		<section
			ref={ref}
			data-slot="audience-contacts-insights"
			className={className}
			{...props}
		>
			<h2 className="flex h-14 items-center text-xl/6 font-bold">Contacts</h2>
			<div className="grid gap-5 xl:grid-cols-[245px_1fr]">
				<div className="space-y-5">
					{metrics.map((metric) => (
						<MetricCard
							key={metric.title}
							title={metric.title}
							tooltip={metric.info}
							value={compact(metric.value)}
							description={metric.description}
							footerValue={
								(metric.footerLabel.includes("percent")
									? percentValue(metric.footerValue)
									: metric.footerLabel.includes("balance")
										? currency(metric.footerValue, "USD", { currencyDisplay: "narrowSymbol", notation: "compact" })
										: number(metric.footerValue, { maximumFractionDigits: 2 })) +
								" " +
								metric.footerLabel
							}
						/>
					))}
				</div>
				<Card>
					<h3 className="px-5 pt-3 text-sm/5 font-medium text-tabs-foreground">Twitter influencers</h3>
					<div className="pb-2.5">
						<Table className="min-w-[700px] [&_tbody_tr]:h-14 [&_td]:h-14 [&_td]:px-5 [&_td]:py-0 [&_td]:text-sm/5 [&_th]:h-[54px] [&_th]:px-5 [&_th]:pt-6 [&_th]:pb-3 [&_th]:text-[13px]/[18px] [&_th]:font-semibold [&_th]:text-[#717a8c] [&_thead_tr]:hover:bg-transparent">
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Username</TableHead>
									<TableHead className="text-right">Followers</TableHead>
									<TableHead className="text-right">NFTs</TableHead>
									<TableHead className="text-right">Balance, USD</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{influencers.map((item) => (
									<TableRow key={item.username}>
										<TableCell>
											<span className="flex items-center gap-4 font-semibold">
												<Avatar size="compact">
													<AvatarImage
														src={item.avatar}
														alt=""
													/>
													<AvatarFallback variant="inverse">{item.title.charAt(0).toUpperCase()}</AvatarFallback>
												</Avatar>
												{item.title}
											</span>
										</TableCell>
										<TableCell>{item.username}</TableCell>
										<TableCell className="text-right">{compact(item.followers)}</TableCell>
										<TableCell className="text-right">{compact(item.nfts)}</TableCell>
										<TableCell className="text-right">
											{currency(item.balance, "USD", { currencyDisplay: "narrowSymbol", notation: "compact" })}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</Card>
			</div>
		</section>
	);
}
