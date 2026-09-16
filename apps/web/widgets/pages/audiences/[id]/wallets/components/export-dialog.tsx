"use client";

import type { ComponentPropsWithRef } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { ShareIcon } from "@superdao/icons/outline";
import { Button } from "@superdao/ui/components/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@superdao/ui/components/dialog";
import { Spinner } from "@superdao/ui/components/spinner";
import { CheckIcon } from "lucide-react";

type ExportStatus = "confirm" | "preparing" | "exported";

export interface AudienceWalletsExportDialogProps extends Omit<
	ComponentPropsWithRef<typeof Dialog>,
	"onOpenChange" | "onOpenChangeComplete" | "open"
> {}

/**
 * Renders the audience wallet CSV export flow from confirmation through completion.
 */
export function AudienceWalletsExportDialog(props: AudienceWalletsExportDialogProps) {
	const [open, setOpen] = useState<boolean>(false);
	const [status, setStatus] = useState<ExportStatus>("confirm");

	useEffect(() => {
		if (status !== "preparing") return;

		const completionTimer = window.setTimeout(() => setStatus("exported"), 1800);

		return () => window.clearTimeout(completionTimer);
	}, [status]);

	/**
	 * Handles the open change.
	 */
	function handleOpenChange(next: boolean) {
		setOpen(next);
	}

	/**
	 * Resets the export flow after the dialog finishes closing.
	 */
	function handleOpenChangeComplete(next: boolean) {
		if (!next) {
			setStatus("confirm");
		}
	}

	return (
		<Dialog
			open={open}
			onOpenChange={handleOpenChange}
			onOpenChangeComplete={handleOpenChangeComplete}
			{...props}
		>
			<DialogTrigger
				render={
					<Button
						type="button"
						variant="ghost"
						className="font-normal"
					/>
				}
			>
				<ShareIcon
					data-icon="inline-start"
					className="text-tabs-foreground"
				/>
				Export
			</DialogTrigger>
			<DialogContent>
				<DialogHeader aria-live="polite">
					<DialogTitle className="flex items-center gap-2">
						{status === "preparing" ? (
							<Spinner
								size="large"
								variant="placeholder"
							/>
						) : null}
						{status === "exported" ? <CheckIcon className="size-6 text-constructive" /> : null}
						<span>{status === "exported" ? "Exported" : "Export CSV"}</span>
					</DialogTitle>
					{status === "confirm" ? (
						<DialogDescription>
							You can export up to 1000 wallets. To remove the limit, contact our{" "}
							<Link
								href=""
								className="text-primary"
							>
								support team
							</Link>
							.
						</DialogDescription>
					) : (
						<DialogDescription className="text-muted-foreground">
							Preparing the file may take a few minutes. Please wait until download starts. We'll also send CSV to your
							email cashmere@example.co once it's ready
						</DialogDescription>
					)}
				</DialogHeader>
				<DialogFooter>
					{status === "confirm" ? (
						<>
							<DialogClose
								render={
									<Button
										type="button"
										variant="ghost"
									/>
								}
							>
								Cancel
							</DialogClose>
							<Button
								type="button"
								onClick={() => setStatus("preparing")}
							>
								Export
							</Button>
						</>
					) : (
						<DialogClose render={<Button type="button" />}>Got It</DialogClose>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
