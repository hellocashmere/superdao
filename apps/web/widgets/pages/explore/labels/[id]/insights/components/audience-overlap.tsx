import type { ComponentPropsWithRef } from "react";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import { Avatar, AvatarFallback, AvatarImage } from "@superdao/ui/components/avatar";
import { Card } from "@superdao/ui/components/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@superdao/ui/components/table";

import type { LabelOverlapView } from "@/entities/label";

export interface LabelAudienceOverlapProps extends ComponentPropsWithRef<"section"> {
	overlap: readonly LabelOverlapView[];
}

/**
 * Composes the label audience overlap section.
 */
export function LabelAudienceOverlap({ ref, className, overlap, ...props }: LabelAudienceOverlapProps) {
	const { compact, number, percentValue } = useNumberFormatter();

	return (
		<section
			ref={ref}
			data-slot="label-audience-overlap"
			className={className}
			{...props}
		>
			<h2 className="flex h-14 items-center text-xl/6 font-bold">Audience overlap</h2>
			<Card>
				<div className="pb-2.5">
					<Table className="min-w-[1000px] [&_tbody_tr]:h-14 [&_td]:h-14 [&_td]:px-5 [&_td]:py-0 [&_td]:text-sm/5 [&_td]:text-[#a2a8b4] [&_td:first-child]:w-[49px] [&_th]:h-[54px] [&_th]:px-5 [&_th]:pt-6 [&_th]:pb-3 [&_th]:text-[13px]/[18px] [&_th]:font-semibold [&_th]:text-[#717a8c] [&_th:first-child]:w-[49px] [&_thead_tr]:hover:bg-transparent">
						<TableHeader>
							<TableRow>
								<TableHead>#</TableHead>
								<TableHead>Label</TableHead>
								<TableHead className="text-right">Owners in audience</TableHead>
								<TableHead className="text-right">Share in audience</TableHead>
								<TableHead className="text-right">Owners</TableHead>
								<TableHead className="text-right">Floor price</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{overlap.map((item, index) => (
								<TableRow key={`${item.title}-${index}`}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>
										<span className="flex items-center gap-4 font-semibold text-white">
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
									<TableCell className="text-right">{compact(item.ownersInAudience)}</TableCell>
									<TableCell className="text-right">{percentValue(item.shareInAudience)}</TableCell>
									<TableCell className="text-right">{compact(item.owners)}</TableCell>
									<TableCell className="text-right">{number(item.floorPrice, { maximumFractionDigits: 2 })}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</Card>
		</section>
	);
}
