import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";
import { Loader2Icon } from "lucide-react";

export interface SpinnerProps extends ComponentProps<"svg"> {
	/**
	 * Controls the spinner dimensions.
	 */
	size?: "default" | "medium" | "large";

	/**
	 * Controls the spinner's visual variant.
	 */
	variant?: "default" | "muted" | "placeholder" | "subdued";

	/**
	 * Centers the spinner in its available horizontal space.
	 */
	centered?: boolean;
}

/**
 * Renders the spinner component.
 */
export function Spinner({
	className,
	size = "default",
	variant = "default",
	centered = false,
	...props
}: SpinnerProps) {
	return (
		<Loader2Icon
			data-slot="spinner"
			data-size={size}
			data-variant={variant}
			data-centered={centered}
			role="status"
			aria-label="Loading"
			className={cn(
				"size-4 animate-spin data-[centered=true]:mx-auto data-[size=large]:size-6 data-[size=medium]:size-5 data-[variant=muted]:text-muted-foreground data-[variant=placeholder]:text-field-placeholder data-[variant=subdued]:text-tabs-foreground",
				className
			)}
			{...props}
		/>
	);
}
