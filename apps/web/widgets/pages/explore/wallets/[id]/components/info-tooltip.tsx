import type { ComponentPropsWithRef } from "react";

import { InfoSmallIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@superdao/ui/components/tooltip";

export interface WalletInfoTooltipProps extends ComponentPropsWithRef<typeof TooltipTrigger> {
	/**
	 * The explanatory text displayed in the tooltip.
	 */
	label: string;
}

/**
 * Renders an information icon with a tooltip opening to its right.
 */
export function WalletInfoTooltip({ ref, className, label, ...props }: WalletInfoTooltipProps) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					ref={ref}
					aria-label={label}
					className={cn(
						"inline-flex size-4 shrink-0 cursor-help items-center justify-center text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
						className
					)}
					{...props}
				>
					<InfoSmallIcon size={16} />
				</TooltipTrigger>
				<TooltipContent
					side="right"
					sideOffset={8}
					className="font-normal"
				>
					{label}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
