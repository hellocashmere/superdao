"use client";

import type { ChangeEvent, ComponentPropsWithRef, SubmitEvent } from "react";
import { useState } from "react";

import { DocumentIcon, EthereumIcon, ListIcon, NftIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@superdao/ui/components/dialog";
import { Field, FieldDescription, FieldGroup } from "@superdao/ui/components/field";
import { Input } from "@superdao/ui/components/input";

import { isEthereumAddress } from "@/shared/lib/crypto";

interface AudienceFileStats {
	invalid: number;
	total: number;
	valid: number;
}

const audienceSources = [
	{
		description: "Upload a file...",
		icon: ListIcon,
		id: "csv",
		title: "CSV file",
	},
	{
		description: "Add contract address",
		icon: NftIcon,
		id: "nft",
		title: "NFT collection",
	},
	{
		description: "Request audience",
		icon: EthereumIcon,
		id: "token",
		title: "Token contract",
	},
	{
		description: "Request custom audience",
		icon: DocumentIcon,
		id: "dapp",
		title: "Dapp contract",
	},
] as const;

export interface CreatedAudience {
	title: string;
	walletCount: number;
}

export interface CreateAudienceDialogProps extends ComponentPropsWithRef<typeof Dialog> {
	onCreate: (audience: CreatedAudience) => void;
}

type DialogChangeDetails = Parameters<NonNullable<CreateAudienceDialogProps["onOpenChange"]>>[1];

/**
 * Renders audience source selection and the CSV audience creation form.
 */
export function CreateAudienceDialog({ onCreate, onOpenChange, open, ...props }: CreateAudienceDialogProps) {
	const [view, setView] = useState<"sources" | "csv">("sources");
	const [title, setTitle] = useState<string>("");
	const [fileName, setFileName] = useState<string>("");
	const [fileError, setFileError] = useState<string>("");
	const [fileStats, setFileStats] = useState<AudienceFileStats | null>(null);

	/**
	 * Clears the audience dialog draft state.
	 */
	function reset() {
		setView("sources");
		setTitle("");
		setFileName("");
		setFileError("");
		setFileStats(null);
	}

	/**
	 * Updates the dialog visibility and resets transient state when it closes.
	 */
	function changeOpen(next: boolean, event?: DialogChangeDetails) {
		if (!next) {
			reset();
		}

		onOpenChange?.(next, event as DialogChangeDetails);
	}

	/**
	 * Stores the selected CSV file for submission.
	 */
	async function selectFile(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];

		if (!file) {
			return;
		}

		setFileName(file.name);
		setFileStats(null);

		if (!file.name.toLowerCase().endsWith(".csv")) {
			setFileError("Wrong file format");
			return;
		}

		const lines = (await file.text())
			.split(/\r?\n/)
			.map((line) => line.trim())
			.filter(Boolean);
		const invalid = lines.filter((line) => !isEthereumAddress(line)).length;

		if (lines.length > 300_000) {
			setFileError("The file contains more than 300k wallets");
			return;
		}

		setFileError("");
		setFileStats({ invalid, total: lines.length, valid: lines.length - invalid });
	}

	/**
	 * Submits the validated form values.
	 */
	function submit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!title.trim() || !fileStats?.valid || fileError) {
			return;
		}

		onCreate({ title: title.trim(), walletCount: fileStats.valid });
		reset();
	}

	const canCreate = Boolean(title.trim()) && Boolean(fileStats?.valid) && !fileError;

	return (
		<Dialog
			open={open}
			onOpenChange={changeOpen}
			{...props}
		>
			{view === "sources" ? (
				<DialogContent
					className="sm:max-w-100"
					showCloseButton
				>
					<DialogHeader className="pb-2">
						<DialogTitle>Create audience</DialogTitle>
						<DialogDescription className="sr-only">Choose how to create an audience.</DialogDescription>
					</DialogHeader>
					<DialogBody className="px-2 pt-0 pb-2">
						{audienceSources.map((source) => {
							const Icon = source.icon;
							const isAvailable = source.id === "csv";

							return (
								<Button
									key={source.id}
									type="button"
									variant="ghost"
									aria-disabled={!isAvailable}
									data-available={isAvailable ? "true" : "false"}
									className="h-14 w-full justify-start gap-4 px-4 text-left aria-disabled:cursor-default aria-disabled:opacity-50 aria-disabled:hover:bg-transparent"
									onClick={() => {
										if (isAvailable) {
											setView("csv");
										}
									}}
								>
									<span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-field text-muted-foreground [&_svg]:size-6">
										<Icon />
									</span>
									<span className="min-w-0">
										<span className="block text-[15px]/6 font-semibold text-foreground">{source.title}</span>
										<span className="block text-[13px]/[18px] font-normal text-muted-foreground">
											{source.description}
										</span>
									</span>
								</Button>
							);
						})}
					</DialogBody>
				</DialogContent>
			) : (
				<DialogContent
					className="sm:max-w-100"
					showCloseButton
				>
					<form
						className="contents"
						onSubmit={submit}
					>
						<DialogHeader className="pb-2">
							<DialogTitle>Create audience</DialogTitle>
							<DialogDescription className="sr-only">
								Name the audience and upload a CSV file containing wallet addresses.
							</DialogDescription>
						</DialogHeader>
						<DialogBody className="pt-0">
							<FieldGroup className="gap-3">
								<Field>
									<Input
										value={title}
										placeholder="Name the audience"
										aria-label="Audience name"
										onChange={(event) => setTitle(event.target.value)}
									/>
								</Field>
								<Field data-invalid={Boolean(fileError)}>
									<label
										className={cn(
											"flex h-10 cursor-pointer items-center truncate rounded-lg bg-field px-4 text-[15px]/6 text-field-placeholder transition-colors hover:bg-field-hover",
											"data-[state=invalid]:text-destructive data-[state=selected]:text-foreground"
										)}
									>
										<span className="truncate">{fileName || "Upload CSV file"}</span>
										<input
											type="file"
											accept=".csv,text/csv"
											className="sr-only"
											aria-invalid={Boolean(fileError)}
											onChange={selectFile}
										/>
									</label>
									<FieldDescription className={fileError ? "text-destructive" : undefined}>
										{fileError || (
											<>
												Each line should contain a single wallet data.
												<br />
												300k wallets max
											</>
										)}
									</FieldDescription>
								</Field>
							</FieldGroup>

							{fileStats ? (
								<dl className="mt-4 rounded-lg bg-field px-4 py-3 text-[13px]/[18px]">
									<div className="flex justify-between text-muted-foreground">
										<dt>Total lines in file</dt>
										<dd>{fileStats.total.toLocaleString("en-US")}</dd>
									</div>
									<div className="flex justify-between text-muted-foreground">
										<dt>Already added</dt>
										<dd>0</dd>
									</div>
									<div className="flex justify-between text-destructive">
										<dt>Invalid</dt>
										<dd>{fileStats.invalid.toLocaleString("en-US")}</dd>
									</div>
									<div className="flex justify-between text-[#50e3a4]">
										<dt>To be added</dt>
										<dd>{fileStats.valid.toLocaleString("en-US")}</dd>
									</div>
								</dl>
							) : null}
						</DialogBody>
						<DialogFooter>
							<Button
								type="button"
								variant="ghost"
								onClick={() => setView("sources")}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								size="wide"
								disabled={!canCreate}
							>
								Create
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			)}
		</Dialog>
	);
}
