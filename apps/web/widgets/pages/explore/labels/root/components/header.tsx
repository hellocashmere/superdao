import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { PageHeader } from "@/shared/ui/page-layout";

export interface LabelsHeaderProps extends ComponentPropsWithRef<typeof PageHeader> {}

/**
 * Renders the heading for the label discovery page.
 */
export function LabelsHeader({ ref, className, ...props }: LabelsHeaderProps) {
	return (
		<PageHeader
			ref={ref}
			data-slot="labels-header"
			className={cn("min-h-18", className)}
			{...props}
		>
			<h1 className="text-2xl/7 font-bold">Labels</h1>
		</PageHeader>
	);
}
