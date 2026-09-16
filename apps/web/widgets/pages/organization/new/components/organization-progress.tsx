import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface OrganizationProgressProps extends ComponentPropsWithRef<"div"> {
	activeStep: number;
	steps: number;
}

/**
 * Renders the segmented progress indicator for the organization flow.
 */
export function OrganizationProgress({ ref, activeStep, className, steps, ...props }: OrganizationProgressProps) {
	return (
		<div
			ref={ref}
			data-slot="organization-progress"
			data-active-step={activeStep}
			className={cn("flex w-full gap-2", className)}
			aria-label={`Step ${activeStep} of ${steps}`}
			{...props}
		>
			{Array.from({ length: steps }, (_, index) => (
				<span
					key={index}
					data-slot="organization-progress-segment"
					data-state={index + 1 === activeStep ? "active" : "inactive"}
					className="h-1 min-w-0 flex-1 rounded-full bg-[#465065] data-[state=active]:bg-white"
				/>
			))}
		</div>
	);
}
