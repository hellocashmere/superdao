"use client";

import { Button } from "@superdao/ui/button";

import { Error as ErrorPage } from "@/widgets/error";

/**
 * Renders the dashboard fallback for unexpected runtime errors.
 */
export default function Error({ unstable_retry }: { error: Error & { digest?: string }; unstable_retry: () => void }) {
	return (
		<ErrorPage
			action={
				<Button
					type="button"
					onClick={unstable_retry}
					size="wide"
				>
					Try again
				</Button>
			}
			variant="server-error"
		/>
	);
}
