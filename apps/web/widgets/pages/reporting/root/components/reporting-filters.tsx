"use client";

import type { ComponentPropsWithRef } from "react";
import { useState } from "react";

import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";
import { Calendar } from "@superdao/ui/components/calendar";
import { Checkbox } from "@superdao/ui/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@superdao/ui/components/dropdown-menu";
import { Input } from "@superdao/ui/components/input";
import { RadioGroup, RadioGroupItem } from "@superdao/ui/components/radio-group";
import { ChevronDown, Search, Share2, SlidersHorizontal, X } from "lucide-react";

import type { ReportingDateRange, ReportingPeriod } from "../model/reporting-data";
import { actionOptions, labelOptions, reportingActionLabels, sourceOptions } from "../model/reporting-data";

export interface ReportingFiltersProps extends ComponentPropsWithRef<"div"> {
  query: string;
  resultCount: number;
  selectedActions: readonly string[];
  selectedSources: readonly string[];
  selectedLabels: readonly string[];
  period: ReportingPeriod;
  dateRange?: ReportingDateRange;
  onQueryChange: (value: string) => void;
  onActionsChange: (value: readonly string[]) => void;
  onSourcesChange: (value: readonly string[]) => void;
  onLabelsChange: (value: readonly string[]) => void;
  onPeriodChange: (period: ReportingPeriod, range?: ReportingDateRange) => void;
  onResetFilters: () => void;
}

/** Renders the reporting search, filter controls, result count, and export action. */
export function ReportingFilters({
  className,
  ref,
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
  const activeFilterCount =
    Number(period !== "All time") +
    Number(selectedActions.length > 0) +
    Number(selectedSources.length > 0) +
    Number(selectedLabels.length > 0);
  const hasFilters = activeFilterCount > 0 || query.length > 0;

  return (
    <div
      {...props}
      ref={ref}
      data-slot="reporting-filters"
      data-filtered={hasFilters}
      className={cn("space-y-4 pb-1", className)}
    >
      <div className="flex min-h-10 flex-wrap items-center gap-x-5 gap-y-3">
        <label className="relative block w-full sm:w-80">
          <span className="sr-only">Search wallets</span>
          <Search className="pointer-events-none absolute top-3 left-3 size-4 text-[#717a8c]" />
          <Input
            type="search"
            value={query}
            placeholder="Search wallets"
            className="pr-9 pl-9 [&::-webkit-search-cancel-button]:appearance-none"
            onChange={(event) => onQueryChange(event.target.value)}
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear wallet search"
              className="absolute top-1 right-1 grid size-8 place-items-center rounded-md text-[#717a8c] outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
              onClick={() => onQueryChange("")}
            >
              <X className="size-4" />
            </button>
          ) : null}
        </label>

        <p
          aria-live="polite"
          className="text-sm/5"
        >
          <span className="font-semibold tabular-nums">{resultCount.toLocaleString("en-US").replaceAll(",", " ")}</span>{" "}
          <span className="text-tabs-foreground">wallets</span>
        </p>

        <Button
          type="button"
          variant="ghost"
          className="ml-auto font-normal"
        >
          <Share2
            data-icon="inline-start"
            className="text-tabs-foreground"
          />
          Export
        </Button>
      </div>

      <div className="flex min-h-9 flex-wrap items-center gap-2">
        <div className="mr-1 flex h-9 items-center gap-2 text-sm/5 font-semibold">
          <SlidersHorizontal className="size-4 text-tabs-foreground" />
          <span>Filters</span>
          {activeFilterCount > 0 ? (
            <span className="grid size-5 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground tabular-nums">
              {activeFilterCount}
            </span>
          ) : null}
        </div>

        <PeriodFilter
          value={period}
          range={dateRange}
          onValueChange={onPeriodChange}
        />
        <MultiSelectFilter
          label="Action"
          placeholder="Any action"
          options={actionOptions}
          optionLabels={reportingActionLabels}
          selected={selectedActions}
          onValueChange={onActionsChange}
        />
        <MultiSelectFilter
          label="Source"
          placeholder="Any source"
          options={sourceOptions}
          selected={selectedSources}
          onValueChange={onSourcesChange}
        />
        <MultiSelectFilter
          label="Labels"
          placeholder="Any label"
          options={labelOptions}
          selected={selectedLabels}
          columns
          onValueChange={onLabelsChange}
        />

        {hasFilters ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="ml-auto rounded-full font-normal text-tabs-foreground"
            onClick={onResetFilters}
          >
            Clear all
          </Button>
        ) : null}
      </div>

      {activeFilterCount > 0 ? (
        <div className="flex flex-wrap items-center gap-2 border-t border-white/5 pt-3">
          <span className="mr-1 text-xs/4 font-semibold text-tabs-foreground uppercase">Applied</span>
          {period !== "All time" ? (
            <ActiveFilterChip
              label="Period"
              value={getPeriodLabel(period, dateRange)}
              onRemove={() => onPeriodChange("All time")}
            />
          ) : null}
          {selectedActions.length > 0 ? (
            <ActiveFilterChip
              label="Action"
              value={getSelectionLabel(selectedActions, reportingActionLabels)}
              onRemove={() => onActionsChange([])}
            />
          ) : null}
          {selectedSources.length > 0 ? (
            <ActiveFilterChip
              label="Source"
              value={getSelectionLabel(selectedSources)}
              onRemove={() => onSourcesChange([])}
            />
          ) : null}
          {selectedLabels.length > 0 ? (
            <ActiveFilterChip
              label="Labels"
              value={getSelectionLabel(selectedLabels)}
              onRemove={() => onLabelsChange([])}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export interface MultiSelectFilterProps extends ComponentPropsWithRef<"div"> {
  label: string;
  placeholder: string;
  options: readonly string[];
  optionLabels?: Readonly<Record<string, string>>;
  selected: readonly string[];
  columns?: boolean;
  onValueChange: (value: readonly string[]) => void;
}

/** Renders a compact checkbox filter with a readable selection summary. */
export function MultiSelectFilter({
  className,
  ref,
  label,
  placeholder,
  options,
  optionLabels,
  selected,
  columns = false,
  onValueChange,
  ...props
}: MultiSelectFilterProps) {
  const displayValue = selected.length === 0 ? placeholder : getSelectionLabel(selected, optionLabels);

  function toggle(option: string, checked: boolean) {
    onValueChange(checked ? [...selected, option] : selected.filter((item) => item !== option));
  }

  return (
    <div
      {...props}
      ref={ref}
      data-slot="reporting-multi-select-filter"
      data-filtered={selected.length > 0}
      className={cn("min-w-0", className)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="secondary"
              size="sm"
              data-active={selected.length > 0}
              className="max-w-56 rounded-full px-3 font-normal data-[active=true]:bg-[#414958]"
              aria-label={`${label}: ${displayValue}`}
            />
          }
        >
          <span className="text-tabs-foreground">{label}:</span>
          <span className="max-w-32 truncate">{displayValue}</span>
          <ChevronDown
            data-icon="inline-end"
            className="text-tabs-foreground"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className={cn("gap-0", columns ? "w-[462px] max-w-[calc(100vw-32px)]" : "w-[248px]")}
        >
          <div className="grid grid-cols-2 border-b border-white/10 py-1">
            <FilterMenuAction
              checked={selected.length === options.length}
              label="Select all"
              onClick={() => onValueChange(options)}
            />
            <FilterMenuAction
              label="Clear"
              onClick={() => onValueChange([])}
            />
          </div>
          <div className={cn("grid py-1", columns && "sm:grid-cols-2")}>
            {options.map((option) => {
              const checked = selected.includes(option);

              return (
                <DropdownMenuItem
                  key={option}
                  closeOnClick={false}
                  className="h-10 gap-3 px-4 text-sm/5"
                  onClick={() => toggle(option, !checked)}
                >
                  <Checkbox
                    checked={checked}
                    className="pointer-events-none size-5"
                  />
                  <span className="truncate">{optionLabels?.[option] ?? option}</span>
                </DropdownMenuItem>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export interface FilterMenuActionProps extends ComponentPropsWithRef<typeof DropdownMenuItem> {
  checked?: boolean;
  label: string;
}

/** Renders a bulk-selection action inside a reporting filter menu. */
export function FilterMenuAction({ className, ref, checked = false, label, ...props }: FilterMenuActionProps) {
  return (
    <DropdownMenuItem
      {...props}
      ref={ref}
      closeOnClick={false}
      className={cn("flex h-10 items-center gap-3 px-4 text-left text-sm/5 hover:bg-secondary-hover", className)}
    >
      <Checkbox
        checked={checked}
        className="pointer-events-none size-5"
      />
      {label}
    </DropdownMenuItem>
  );
}

export interface PeriodFilterProps extends ComponentPropsWithRef<"div"> {
  value: ReportingPeriod;
  range?: ReportingDateRange;
  onValueChange: (period: ReportingPeriod, range?: ReportingDateRange) => void;
}

/** Renders the reporting period shortcuts and custom date-range picker. */
export function PeriodFilter({ className, ref, value, range, onValueChange, ...props }: PeriodFilterProps) {
  const [open, setOpen] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const displayValue = getPeriodLabel(value, range);

  return (
    <div
      {...props}
      ref={ref}
      data-slot="reporting-period-filter"
      data-filtered={value !== "All time"}
      className={cn("min-w-0", className)}
    >
      <DropdownMenu
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) setCustomMode(false);
        }}
      >
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="secondary"
              size="sm"
              data-active={value !== "All time"}
              className="max-w-60 rounded-full px-3 font-normal data-[active=true]:bg-[#414958]"
              aria-label={`Period: ${displayValue}`}
            />
          }
        >
          <span className="text-tabs-foreground">Period:</span>
          <span className="max-w-40 truncate">{displayValue}</span>
          <ChevronDown
            data-icon="inline-end"
            className="text-tabs-foreground"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className={cn("gap-0", customMode ? "w-[328px] bg-card" : "w-[248px]")}
        >
          {customMode ? (
            <ReportingDatePicker
              value={range}
              onCancel={() => setCustomMode(false)}
              onSave={(nextRange) => {
                onValueChange(nextRange?.from ? "Custom period" : "All time", nextRange);
                setOpen(false);
              }}
            />
          ) : (
            <PeriodMenu
              value={value}
              onValueChange={(nextValue) => {
                if (nextValue === "Custom period") setCustomMode(true);
                else {
                  onValueChange(nextValue);
                  setOpen(false);
                }
              }}
            />
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export interface PeriodMenuProps extends ComponentPropsWithRef<"div"> {
  value: ReportingPeriod;
  onValueChange: (value: ReportingPeriod) => void;
}

/** Renders quick period presets with one current selection. */
export function PeriodMenu({ className, ref, value, onValueChange, ...props }: PeriodMenuProps) {
  const quickPeriods: ReportingPeriod[] = ["All time", "Today", "Last 7 days", "Last 30 days"];

  return (
    <div
      {...props}
      ref={ref}
      data-slot="reporting-period-menu"
      className={className}
    >
      <RadioGroup
        value={value}
        className="gap-0 py-1"
      >
        {quickPeriods.map((item) => (
          <DropdownMenuItem
            key={item}
            closeOnClick={false}
            className="flex h-10 cursor-pointer items-center gap-3 px-4 text-sm/5 hover:bg-secondary-hover"
            onClick={() => onValueChange(item)}
          >
            <RadioGroupItem
              value={item}
              className="pointer-events-none size-5"
            />
            {item}
          </DropdownMenuItem>
        ))}
      </RadioGroup>
      <DropdownMenuItem
        closeOnClick={false}
        className="flex h-10 w-full items-center border-t border-white/10 px-4 text-sm/5 hover:bg-secondary-hover"
        onClick={() => onValueChange("Custom period")}
      >
        Choose date range…
      </DropdownMenuItem>
    </div>
  );
}

export interface ReportingDatePickerProps extends ComponentPropsWithRef<"div"> {
  value?: ReportingDateRange;
  onCancel: () => void;
  onSave: (value: ReportingDateRange | undefined) => void;
}

/** Renders a compact date-range calendar with editable boundaries. */
export function ReportingDatePicker({ className, ref, value, onCancel, onSave, ...props }: ReportingDatePickerProps) {
  const [draft, setDraft] = useState<ReportingDateRange>(value ?? { from: undefined });
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      {...props}
      ref={ref}
      data-slot="reporting-date-picker"
      className={cn("overflow-hidden rounded-lg bg-card", className)}
    >
      <div className="relative px-6 pt-5 pb-5">
        <Calendar
          mode="range"
          weekStartsOn={1}
          selected={draft}
          defaultMonth={draft.from ?? new Date(2026, 7, 1)}
          onSelect={(nextRange) => setDraft(nextRange ?? { from: undefined })}
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

export interface ActiveFilterChipProps extends ComponentPropsWithRef<typeof Button> {
  label: string;
  value: string;
  onRemove: () => void;
}

/** Renders a removable summary of one applied filter group. */
export function ActiveFilterChip({ className, ref, label, value, onRemove, ...props }: ActiveFilterChipProps) {
  return (
    <Button
      {...props}
      ref={ref}
      type="button"
      variant="secondary"
      size="sm"
      data-slot="active-filter-chip"
      className={cn("h-8 rounded-full px-3 font-normal", className)}
      aria-label={`Remove ${label.toLowerCase()} filter`}
      onClick={onRemove}
    >
      <span className="text-tabs-foreground">{label}:</span>
      <span className="max-w-48 truncate">{value}</span>
      <X
        data-icon="inline-end"
        className="text-tabs-foreground"
      />
    </Button>
  );
}

function getSelectionLabel(selected: readonly string[], labels?: Readonly<Record<string, string>>) {
  const first = labels?.[selected[0] ?? ""] ?? selected[0] ?? "";
  return selected.length === 1 ? first : `${first} +${selected.length - 1}`;
}

function getPeriodLabel(period: ReportingPeriod, range?: ReportingDateRange) {
  if (period !== "Custom period" || !range?.from) return period;

  const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
  const from = formatter.format(range.from);
  const to = formatter.format(range.to ?? range.from);

  return from === to ? from : `${from} – ${to}`;
}
