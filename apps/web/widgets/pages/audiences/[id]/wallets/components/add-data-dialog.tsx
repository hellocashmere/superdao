"use client";

import type { ChangeEvent, ComponentPropsWithRef, SubmitEvent } from "react";
import { useState } from "react";

import { AddIcon } from "@superdao/icons/outline";
import { Button } from "@superdao/ui/components/button";
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@superdao/ui/components/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@superdao/ui/components/field";

export interface AudienceAddDataDialogProps extends Omit<
	ComponentPropsWithRef<typeof Dialog>,
	"onOpenChange" | "onOpenChangeComplete" | "open"
> {}

/**
 * Renders the placeholder CSV upload dialog for audience wallets.
 */
export function AudienceAddDataDialog(props: AudienceAddDataDialogProps) {
	const [fileName, setFileName] = useState<string>("");
	const [open, setOpen] = useState<boolean>(false);

	/**
	 * Handles the open change.
	 */
	function handleOpenChange(next: boolean) {
		setOpen(next);
	}

	/**
	 * Clears the selected file after the dialog finishes closing.
	 */
	function handleOpenChangeComplete(next: boolean) {
		if (!next) {
			setFileName("");
		}
	}

	/**
	 * Stores the selected CSV file for submission.
	 */
	function selectFile(event: ChangeEvent<HTMLInputElement>) {
		setFileName(event.target.files?.[0]?.name ?? "");
	}

	/**
	 * Submits the validated form values.
	 */
	function submit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		handleOpenChange(false);
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
				<AddIcon
					data-icon="inline-start"
					className="text-tabs-foreground"
				/>
				Add data
			</DialogTrigger>

			<DialogContent showCloseButton={false}>
				<form
					className="contents"
					onSubmit={submit}
				>
					<DialogHeader className="pb-2">
						<DialogTitle>Add wallets</DialogTitle>
						<DialogDescription className="sr-only">
							Upload a CSV file containing wallets to add to this audience.
						</DialogDescription>
					</DialogHeader>

					<DialogBody className="pt-0">
						<FieldGroup>
							<Field>
								<FieldLabel
									data-state={fileName ? "selected" : "empty"}
									className="flex h-10 cursor-pointer items-center truncate rounded-lg bg-field px-4 text-[15px]/6 text-field-placeholder transition-colors hover:bg-field-hover data-[state=selected]:text-foreground"
								>
									<span className="truncate">{fileName || "Upload CSV file"}</span>
									<input
										type="file"
										accept=".csv,text/csv"
										className="sr-only"
										onChange={selectFile}
									/>
								</FieldLabel>
								<FieldDescription>
									Each line should contain a single wallet data.
									<br />
									300k wallets max
								</FieldDescription>
							</Field>
						</FieldGroup>
					</DialogBody>

					<DialogFooter>
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
							type="submit"
							size="wide"
							disabled={!fileName}
						>
							Add
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
