import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import { cn } from "@superdao/lib/utils";

import type { LabelView } from "@/entities/label";
import { LabelIcon } from "@/entities/label";
import { exploreRoutes } from "@/shared/lib/routes";

export interface LabelCardProps extends Omit<ComponentPropsWithRef<"a">, "id" | "title"> {
	/**
	 * Label preview rendered by the directory link.
	 */
	label: LabelView;
}

/**
 * Renders a link to a label with its icon and wallet count.
 */
export function LabelCard({ ref, className, label, ...props }: LabelCardProps) {
	const { compact } = useNumberFormatter();

	return (
		<Link
			ref={ref}
			href={exploreRoutes.labelWallets(label.id)}
			data-slot="label-card"
			className={cn(
				"flex h-16 items-center gap-4 rounded-lg outline-none hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring/40",
				className
			)}
			{...props}
		>
			<span
				className="flex size-16 items-center justify-center rounded-lg"
				style={{ backgroundColor: `${label.color}14` }}
			>
				<LabelIcon
					labelSlug={label.slug}
					className="size-8"
					style={{ color: label.color }}
				/>
			</span>
			<span>
				<span className="block text-[17px]/[21px] font-bold">{label.title}</span>
				<span className="mt-1 block text-sm/5 text-tabs-foreground">{compact(label.walletCount)}</span>
			</span>
		</Link>
	);
}
