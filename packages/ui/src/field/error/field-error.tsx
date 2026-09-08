import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface FieldErrorProps extends ComponentProps<"div"> {
	/**
	 * Lists validation errors whose messages are rendered by the component.
	 */
	errors?: Array<{ message?: string } | undefined>;
}

/**
 * Renders the field error component.
 */
export function FieldError({ className, children, errors, ...props }: FieldErrorProps) {
	let content = children;

	if (!content && errors?.length) {
		const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];

		if (uniqueErrors?.length == 1) {
			content = uniqueErrors[0]?.message;
		} else {
			content = (
				<ul className="ml-4 flex list-disc flex-col gap-1">
					{uniqueErrors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
				</ul>
			);
		}
	}

	if (!content) {
		return null;
	}

	return (
		<div
			role="alert"
			data-slot="field-error"
			className={cn("text-sm font-normal text-destructive", className)}
			{...props}
		>
			{content}
		</div>
	);
}
