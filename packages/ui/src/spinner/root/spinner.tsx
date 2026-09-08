import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";
import { Loader2Icon } from "lucide-react";

export interface SpinnerProps extends ComponentProps<"svg"> {
	/**
	 * Controls the spinner dimensions.
	 */
	size?: "default" | "medium" | "large";

	/**
	 * Controls the spinner's semantic color.
	 */
	tone?: "default" | "muted" | "placeholder" | "subdued";

	/**
	 * Centers the spinner in its available horizontal space.
	 */
	centered?: boolean;
}

/**
 * Renders the spinner component.
 */
export function Spinner({ className, size = "default", tone = "default", centered = false, ...props }: SpinnerProps) {
	return (
		<Loader2Icon
			data-slot="spinner"
			data-size={size}
			data-tone={tone}
			data-centered={centered}
			role="status"
			aria-label="Loading"
			className={cn(
				"size-4 animate-spin data-[centered=true]:mx-auto data-[size=large]:size-6 data-[size=medium]:size-5 data-[tone=muted]:text-muted-foreground data-[tone=placeholder]:text-field-placeholder data-[tone=subdued]:text-tabs-foreground",
				className
			)}
			{...props}
		/>
	);
}
