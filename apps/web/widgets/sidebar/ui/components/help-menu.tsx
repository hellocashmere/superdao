import type { ComponentPropsWithRef } from "react";

import { CalendarIcon, InfoIcon, LifebuoyNavIcon, SendIcon } from "@superdao/icons";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@superdao/ui/components/dropdown-menu";

export interface HelpMenuProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders links to onboarding, support, and product information.
 */
export function HelpMenu({ ref, className, ...props }: HelpMenuProps) {
	return (
		<div
			ref={ref}
			data-slot="sidebar-help-menu"
			className={className}
			{...props}
		>
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<button
							className="flex h-10 w-full items-center gap-3 px-5 text-left text-[15px]/[24px] font-semibold outline-hidden hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset data-popup-open:bg-sidebar-accent"
							type="button"
						/>
					}
				>
					<LifebuoyNavIcon className="text-sidebar-muted-foreground" />
					<span>Help</span>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					align="start"
					alignOffset={8}
					side="top"
					sideOffset={4}
					className="w-68"
				>
					<DropdownMenuItem className="h-10 gap-3 rounded-none px-3 text-[15px]/[24px] font-semibold">
						<CalendarIcon />
						Intro to Wallet Marketing
					</DropdownMenuItem>
					<DropdownMenuItem className="h-10 gap-3 rounded-none px-3 text-[15px]/[24px] font-semibold">
						<SendIcon />
						Support chat
					</DropdownMenuItem>
					<DropdownMenuItem className="h-10 gap-3 rounded-none px-3 text-[15px]/[24px] font-semibold">
						<InfoIcon />
						About Superdao
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
