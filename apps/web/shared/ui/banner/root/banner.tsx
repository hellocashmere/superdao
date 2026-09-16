"use client";

import type { ComponentPropsWithRef } from "react";
import { useEffect, useState } from "react";

import { CloseIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";

export interface BannerProps extends ComponentPropsWithRef<"aside"> {
	/**
	 * Called with the next visibility state when the banner is dismissed.
	 */
	onOpenChange?: (open: boolean) => void;

	/**
	 * Controls whether the banner is visible.
	 *
	 * When omitted, the banner manages its own visibility and starts open.
	 */
	open?: boolean;

	/**
	 * Determines whether the built-in dismissal button is rendered.
	 *
	 * @defaultValue `true`
	 */
	showCloseButton?: boolean;
}

/**
 * Renders the animated banner container and manages its dismissal state.
 *
 * Composition:
 * ```text
 * Banner
 * ├── BannerIcon
 * ├── BannerTitle
 * │   └── BannerDescription
 * └── BannerActions
 * ```
 */
export function Banner({
	ref,
	children,
	className,
	onOpenChange,
	open,
	role = "region",
	showCloseButton = true,
	...props
}: BannerProps) {
	const [internalOpen, setInternalOpen] = useState<boolean>(true);
	const [hasEntered, setHasEntered] = useState<boolean>(false);
	const isControlled = open !== undefined;
	const resolvedOpen = isControlled ? open : internalOpen;
	const isVisible = resolvedOpen && hasEntered;

	useEffect(() => {
		const frame = requestAnimationFrame(() => {
			setHasEntered(resolvedOpen);
		});

		return () => cancelAnimationFrame(frame);
	}, [resolvedOpen]);

	/**
	 * Closes the banner and notifies controlled consumers.
	 */
	function dismissBanner() {
		if (!isControlled) {
			setInternalOpen(false);
		}

		onOpenChange?.(false);
	}

	return (
		<aside
			ref={ref}
			role={role}
			inert={!isVisible}
			aria-hidden={!isVisible}
			data-slot="banner"
			data-state={isVisible ? "open" : "closed"}
			data-show-close-button={showCloseButton ? "true" : "false"}
			className={cn(
				"fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-50 mx-auto flex w-auto items-center gap-4 rounded-2xl py-3 pr-6 pl-4 text-tooltip-foreground shadow-2xl shadow-black/20 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:pointer-events-none data-[state=closed]:translate-y-[calc(100%+1.5rem)] data-[state=closed]:opacity-0 data-[state=open]:translate-y-0 data-[state=open]:opacity-100 motion-reduce:transition-none sm:right-6 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:left-6 sm:max-w-[778px]",
				"bg-tooltip max-sm:flex-wrap max-sm:items-start",
				className
			)}
			{...props}
		>
			{children}
			{showCloseButton ? (
				<Button
					type="button"
					variant="ghost"
					size="icon-xs"
					aria-label="Dismiss notification"
					onClick={dismissBanner}
				>
					<CloseIcon />
				</Button>
			) : null}
		</aside>
	);
}
