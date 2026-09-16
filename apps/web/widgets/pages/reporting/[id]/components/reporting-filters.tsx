"use client";

import type { ComponentPropsWithRef } from "react";
import { useState } from "react";

import {
	ArrowDownIcon,
	CalendarIcon,
	CloseIcon,
	DocumentIcon,
	LinkIcon,
	SearchIcon,
	TagIcon,
	TransactionIcon,
} from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";
import { Calendar } from "@superdao/ui/components/calendar";
import { Checkbox } from "@superdao/ui/components/checkbox";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@superdao/ui/components/field";
import { Input } from "@superdao/ui/components/input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@superdao/ui/components/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "@superdao/ui/components/popover";
import { RadioGroup, RadioGroupItem } from "@superdao/ui/components/radio-group";

import type { ReportingAction, ReportingWalletView } from "@/entities/reporting";

import type { ReportingDateRange, ReportingPeriod } from "../model/types";

import { ReportingWalletsExportDialog } from "./wallet-table/export-dialog";

const actionOptions: readonly ReportingAction[] = ["TARGET_ACTION_MINT", "WALLET_CONNECT", "PAGE_VIEW"];
const reportingActionLabels: Readonly<Record<ReportingAction, string>> = {
	PAGE_VIEW: "Page viewed",
	TARGET_ACTION_MINT: "Minted",
	WALLET_CONNECT: "Wallet connected",
};

export interface ReportingFiltersProps extends ComponentPropsWithRef<"div"> {
	wallets: readonly ReportingWalletView[];
	query: string;
	resultCount: number;
	selectedActions: readonly ReportingAction[];
	selectedSources: readonly string[];
	selectedLabels: readonly string[];
	period: ReportingPeriod;
	dateRange?: ReportingDateRange;
	onQueryChange: (value: string) => void;
	onActionsChange: (value: readonly ReportingAction[]) => void;
	onSourcesChange: (value: readonly string[]) => void;
	onLabelsChange: (value: readonly string[]) => void;
	onPeriodChange: (period: ReportingPeriod, range?: ReportingDateRange) => void;
	onResetFilters: () => void;
}

/**
 * Renders reporting search, filter controls, result count, and table actions.
 */
export function ReportingFilters({
	ref,
	className,
	wallets,
	query,
	resultCount,
	selectedActions,
	selectedSources,
	selectedLabels,
	period,
	dateRange,
	onQueryChange,
	onActionsChange,
	onSourcesChange,
	onLabelsChange,
	onPeriodChange,
	onResetFilters,
	...props
}: ReportingFiltersProps) {
	const [openFilter, setOpenFilter] = useState<"period" | "action" | "source" | "labels" | null>(null);
	const [customPeriodOpen, setCustomPeriodOpen] = useState<boolean>(false);
	const sourceOptions = Array.from(new Set(wallets.map((wallet) => wallet.source)));
	const labelOptions = Array.from(new Set(wallets.flatMap((wallet) => wallet.labels)));
	const hasActiveCriteria =
		query.trim().length > 0 ||
		period !== "All time" ||
		selectedActions.length > 0 ||
		selectedSources.length > 0 ||
		selectedLabels.length > 0;
	const hasActiveFilters =
		period !== "All time" || selectedActions.length > 0 || selectedSources.length > 0 || selectedLabels.length > 0;

	/**
	 * Handles the filter open change.
	 */
	function handleFilterOpenChange(filter: Exclude<typeof openFilter, null>, open: boolean) {
		setOpenFilter(open ? filter : null);
		if (!open && filter === "period") setCustomPeriodOpen(false);
	}

	return (
		<div
			ref={ref}
			data-slot="reporting-filters"
			data-filtered={hasActiveCriteria}
			className={cn("flex flex-col gap-4 pb-1", className)}
			{...props}
		>
			<div className="flex min-h-10 flex-wrap items-center gap-5">
				<label className="block w-full sm:w-55">
					<span className="sr-only">Search wallets</span>
					<InputGroup>
						<InputGroupAddon className="pl-3 text-icon">
							<SearchIcon size={16} />
						</InputGroupAddon>
						<InputGroupInput
							type="search"
							value={query}
							placeholder="Search"
							className="pr-0 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
							onChange={(event) => onQueryChange(event.target.value)}
						/>
						{query ? (
							<InputGroupAddon
								align="inline-end"
								className="text-icon"
							>
								<InputGroupButton
									type="button"
									variant="ghost"
									size="icon-xs"
									aria-label="Clear search"
									onClick={() => onQueryChange("")}
								>
									<CloseIcon className="size-4!" />
								</InputGroupButton>
							</InputGroupAddon>
						) : null}
					</InputGroup>
				</label>

				<Popover
					open={openFilter === "period"}
					onOpenChange={(open) => handleFilterOpenChange("period", open)}
				>
					<PopoverTrigger
						render={
							<Button
								type="button"
								variant="secondary"
								data-active={period !== "All time"}
								className="font-normal data-[active=true]:bg-secondary-hover"
							/>
						}
					>
						<CalendarIcon data-icon="inline-start" />
						{period === "All time" ? "Period" : getPeriodLabel(period, dateRange)}
						<ArrowDownIcon data-icon="inline-end" />
					</PopoverTrigger>
					<PopoverContent
						align="start"
						initialFocus={false}
					>
						{customPeriodOpen ? (
							<ReportingDatePicker
								value={dateRange}
								onCancel={() => setCustomPeriodOpen(false)}
								onSave={(range) => {
									onPeriodChange(range?.from ? "Custom period" : "All time", range);
									setOpenFilter(null);
									setCustomPeriodOpen(false);
								}}
							/>
						) : (
							<PeriodFilterSection
								value={period}
								onValueChange={(period) => {
									if (period === "Custom period") setCustomPeriodOpen(true);
									else onPeriodChange(period);
								}}
							/>
						)}
					</PopoverContent>
				</Popover>

				<Popover
					open={openFilter === "action"}
					onOpenChange={(open) => handleFilterOpenChange("action", open)}
				>
					<PopoverTrigger
						render={
							<Button
								type="button"
								variant="secondary"
								data-active={selectedActions.length > 0}
								className="font-normal data-[active=true]:bg-secondary-hover"
							/>
						}
					>
						<TransactionIcon data-icon="inline-start" />
						Action{selectedActions.length > 0 ? ` · ${selectedActions.length}` : null}
						<ArrowDownIcon data-icon="inline-end" />
					</PopoverTrigger>
					<PopoverContent
						align="start"
						initialFocus={false}
					>
						<FilterCheckboxGroup
							label="Action"
							options={actionOptions}
							optionLabels={reportingActionLabels}
							selected={selectedActions}
							onValueChange={onActionsChange}
						/>
					</PopoverContent>
				</Popover>

				<Popover
					open={openFilter === "source"}
					onOpenChange={(open) => handleFilterOpenChange("source", open)}
				>
					<PopoverTrigger
						render={
							<Button
								type="button"
								variant="secondary"
								data-active={selectedSources.length > 0}
								className="font-normal data-[active=true]:bg-secondary-hover"
							/>
						}
					>
						<LinkIcon data-icon="inline-start" />
						Source{selectedSources.length > 0 ? ` · ${selectedSources.length}` : null}
						<ArrowDownIcon data-icon="inline-end" />
					</PopoverTrigger>
					<PopoverContent
						align="start"
						initialFocus={false}
					>
						<FilterCheckboxGroup
							label="Source"
							options={sourceOptions}
							selected={selectedSources}
							onValueChange={onSourcesChange}
						/>
					</PopoverContent>
				</Popover>

				<Popover
					open={openFilter === "labels"}
					onOpenChange={(open) => handleFilterOpenChange("labels", open)}
				>
					<PopoverTrigger
						render={
							<Button
								type="button"
								variant="secondary"
								data-active={selectedLabels.length > 0}
								className="font-normal data-[active=true]:bg-secondary-hover"
							/>
						}
					>
						<TagIcon data-icon="inline-start" />
						Labels{selectedLabels.length > 0 ? ` · ${selectedLabels.length}` : null}
						<ArrowDownIcon data-icon="inline-end" />
					</PopoverTrigger>
					<PopoverContent
						align="start"
						initialFocus={false}
					>
						<FilterCheckboxGroup
							label="Labels"
							options={labelOptions}
							selected={selectedLabels}
							columns
							onValueChange={onLabelsChange}
						/>
					</PopoverContent>
				</Popover>

				{hasActiveCriteria ? (
					<p
						aria-live="polite"
						className="flex gap-1 text-sm/5"
					>
						<span className="font-semibold tabular-nums">
							{resultCount.toLocaleString("en-US").replaceAll(",", " ")}
						</span>
						<span className="text-tabs-foreground">wallets</span>
					</p>
				) : null}

				<div className="ml-auto flex items-center gap-2">
					<Button
						type="button"
						variant="ghost"
						className="font-normal"
					>
						<DocumentIcon
							data-icon="inline-start"
							className="text-tabs-foreground"
						/>
						FAQ
					</Button>
					<ReportingWalletsExportDialog />
				</div>
			</div>

			{hasActiveFilters ? (
				<div className="flex min-h-12 flex-wrap items-center gap-3 pt-4">
					{period !== "All time" ? (
						<ActiveFilterChip
							label={getPeriodLabel(period, dateRange)}
							accessibleLabel="period"
							onRemove={() => onPeriodChange("All time")}
						/>
					) : null}
					{selectedActions.map((action) => (
						<ActiveFilterChip
							key={action}
							label={reportingActionLabels[action]}
							accessibleLabel={`action ${action}`}
							onRemove={() => onActionsChange(selectedActions.filter((selected) => selected !== action))}
						/>
					))}
					{selectedSources.map((source) => (
						<ActiveFilterChip
							key={source}
							label={source}
							accessibleLabel={`source ${source}`}
							onRemove={() => onSourcesChange(selectedSources.filter((selected) => selected !== source))}
						/>
					))}
					{selectedLabels.map((label) => (
						<ActiveFilterChip
							key={label}
							label={label}
							accessibleLabel={`label ${label}`}
							onRemove={() => onLabelsChange(selectedLabels.filter((selected) => selected !== label))}
						/>
					))}
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="rounded-full! text-tabs-foreground"
						onClick={onResetFilters}
					>
						Clear all
					</Button>
				</div>
			) : null}
		</div>
	);
}

export interface FilterCheckboxGroupProps<Option extends string> extends ComponentPropsWithRef<typeof FieldSet> {
	label: string;
	options: readonly Option[];
	optionLabels?: Readonly<Partial<Record<Option, string>>>;
	selected: readonly Option[];
	columns?: boolean;
	onValueChange: (value: readonly Option[]) => void;
}

/**
 * Renders a labeled group of reporting filter checkboxes.
 */
export function FilterCheckboxGroup<Option extends string>({
	ref,
	className,
	label,
	options,
	optionLabels,
	selected,
	columns = false,
	onValueChange,
	...props
}: FilterCheckboxGroupProps<Option>) {
	/**
	 * Updates one selected filter option.
	 */
	function toggle(option: Option, checked: boolean) {
		onValueChange(checked ? [...selected, option] : selected.filter((item) => item !== option));
	}

	return (
		<FieldSet
			ref={ref}
			data-slot="reporting-filter-group"
			className={cn("gap-2", className)}
			{...props}
		>
			<FieldGroup
				data-variant="checkbox-group"
				className={cn("grid gap-1", columns && "sm:grid-cols-2")}
			>
				{options.map((option) => {
					const checkboxID = `reporting-${label.toLowerCase()}-${option.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;

					return (
						<Field
							key={option}
							orientation="horizontal"
							className="h-9 gap-3 rounded-md px-2 hover:bg-secondary-hover"
						>
							<Checkbox
								id={checkboxID}
								checked={selected.includes(option)}
								onCheckedChange={(checked) => toggle(option, checked)}
							/>
							<FieldLabel
								htmlFor={checkboxID}
								className="min-w-0 cursor-pointer font-normal"
							>
								<span className="truncate">{optionLabels?.[option] ?? option}</span>
							</FieldLabel>
						</Field>
					);
				})}
			</FieldGroup>
		</FieldSet>
	);
}

export interface PeriodFilterSectionProps extends ComponentPropsWithRef<typeof FieldSet> {
	value: ReportingPeriod;
	onValueChange: (value: ReportingPeriod) => void;
}

/**
 * Renders reporting period presets and the custom date-range action.
 */
export function PeriodFilterSection({ ref, className, value, onValueChange, ...props }: PeriodFilterSectionProps) {
	const quickPeriods: ReportingPeriod[] = ["All time", "Today", "Last 7 days", "Last 30 days"];

	return (
		<FieldSet
			ref={ref}
			data-slot="reporting-period-filter"
			className={cn("gap-2", className)}
			{...props}
		>
			<RadioGroup
				value={value}
				className="gap-1"
				onValueChange={(value) => onValueChange(value as ReportingPeriod)}
			>
				{quickPeriods.map((item) => {
					const radioID = `reporting-period-${item.toLowerCase().replaceAll(" ", "-")}`;

					return (
						<Field
							key={item}
							orientation="horizontal"
							className="h-9 gap-3 rounded-md px-2 hover:bg-secondary-hover"
						>
							<RadioGroupItem
								id={radioID}
								value={item}
							/>
							<FieldLabel
								htmlFor={radioID}
								className="cursor-pointer font-normal"
							>
								{item}
							</FieldLabel>
						</Field>
					);
				})}
			</RadioGroup>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				className="justify-start font-normal"
				onClick={() => onValueChange("Custom period")}
			>
				Choose date range…
			</Button>
		</FieldSet>
	);
}

export interface ReportingDatePickerProps extends ComponentPropsWithRef<"div"> {
	value?: ReportingDateRange;
	onCancel: () => void;
	onSave: (value: ReportingDateRange | undefined) => void;
}

/**
 * Renders a compact date-range calendar with editable boundaries.
 */
export function ReportingDatePicker({ ref, className, value, onCancel, onSave, ...props }: ReportingDatePickerProps) {
	const [draft, setDraft] = useState<ReportingDateRange>(value ?? { from: undefined });
	const formatter = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	return (
		<div
			ref={ref}
			data-slot="reporting-date-picker"
			className={cn("w-[328px] overflow-hidden rounded-lg bg-card", className)}
			{...props}
		>
			<div className="relative px-6 pt-5 pb-5">
				<Calendar
					mode="range"
					weekStartsOn={1}
					selected={draft}
					defaultMonth={draft.from ?? new Date(2026, 7, 1)}
					onSelect={(range) => setDraft(range ?? { from: undefined })}
					className="w-full bg-transparent p-0 [--cell-radius:8px] [--cell-size:40px]"
					classNames={{
						month: "flex w-full flex-col gap-3",
						month_caption: "flex h-7 w-full items-center justify-center px-10",
						month_grid: "mt-[52px] w-full border-collapse",
						nav: "absolute inset-x-0 top-0 flex h-7 w-full items-center justify-between",
						button_previous: "size-7 p-0 text-[#717a8c]",
						button_next: "size-7 p-0 text-[#717a8c]",
						caption_label: "text-[17px]/[21px] font-bold",
						weekday: "flex-1 text-[15px]/6 font-semibold text-white",
						week: "flex w-full",
						day: "relative size-10 p-0 text-center",
						outside: "text-[#717a8c] opacity-50",
					}}
				/>
				<div className="absolute top-[53px] right-6 left-6 grid grid-cols-2 gap-3">
					<Input
						readOnly
						value={draft.from ? formatter.format(draft.from) : ""}
						placeholder="Start date"
						className="px-3.5"
					/>
					<Input
						readOnly
						value={draft.to ? formatter.format(draft.to) : ""}
						placeholder="End date"
						className="px-3.5"
					/>
				</div>
			</div>
			<div className="flex h-18 items-center justify-end gap-1 border-t border-white/5 bg-[#343a46] px-6">
				<Button
					type="button"
					variant="ghost"
					className="font-normal"
					onClick={onCancel}
				>
					Cancel
				</Button>
				<Button
					type="button"
					className="font-normal"
					disabled={!draft.from}
					onClick={() => onSave(draft.from ? draft : undefined)}
				>
					Apply dates
				</Button>
			</div>
		</div>
	);
}

export interface ActiveFilterChipProps extends ComponentPropsWithRef<"button"> {
	label: string;
	accessibleLabel: string;
	onRemove: () => void;
}

/**
 * Renders one removable applied reporting filter value.
 */
export function ActiveFilterChip({
	ref,
	className,
	label,
	accessibleLabel,
	onRemove,
	...props
}: ActiveFilterChipProps) {
	return (
		<button
			ref={ref}
			type="button"
			data-slot="active-filter-chip"
			className={cn(
				"flex h-8 items-center gap-1 rounded-full bg-popover px-4 text-sm/5 font-semibold outline-none hover:bg-secondary-hover focus-visible:ring-2 focus-visible:ring-ring/40",
				className
			)}
			aria-label={`Remove ${accessibleLabel} filter`}
			onClick={onRemove}
			{...props}
		>
			{label}
			<CloseIcon
				size={16}
				className="text-tabs-foreground"
			/>
		</button>
	);
}

/**
 * Returns the period label.
 */
function getPeriodLabel(period: ReportingPeriod, range?: ReportingDateRange) {
	if (period !== "Custom period" || !range?.from) return period;

	const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
	const from = formatter.format(range.from);
	const to = formatter.format(range.to ?? range.from);

	return from === to ? from : `${from} – ${to}`;
}
