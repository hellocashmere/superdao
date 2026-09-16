"use client";

import type { ChangeEventHandler, ComponentPropsWithRef } from "react";

import { CloseIcon, SearchIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@superdao/ui/components/input-group";

import { PageHeader } from "@/shared/ui/page-layout";

export interface DappsRootHeaderProps extends ComponentPropsWithRef<typeof PageHeader> {
	/**
	 * Current directory search value.
	 */
	search: string;

	/**
	 * Clears the current directory search.
	 */
	onClearSearch: () => void;

	/**
	 * Handles changes to the directory search input.
	 */
	onSearchChange: ChangeEventHandler<HTMLInputElement>;
}

/**
 * Renders the dapps directory heading, count, and search field.
 */
export function DappsRootHeader({
	ref,
	className,
	onClearSearch,
	onSearchChange,
	search,
	...props
}: DappsRootHeaderProps) {
	return (
		<PageHeader
			ref={ref}
			data-slot="dapps-root-header"
			className={cn("flex min-h-18 items-center justify-between gap-5", className)}
			{...props}
		>
			<div className="flex items-end gap-3">
				<h1 className="text-2xl/7 font-bold">Dapps</h1>
				<span className="pb-0.5 text-xl/6 font-bold text-icon">120k</span>
			</div>
			<label className="hidden w-60 sm:block">
				<span className="sr-only">Search dapps</span>
				<InputGroup>
					<InputGroupAddon className="pl-3 text-icon">
						<SearchIcon size={16} />
					</InputGroupAddon>
					<InputGroupInput
						type="search"
						value={search}
						placeholder="Search"
						className="pr-0 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
						onChange={onSearchChange}
					/>
					{search ? (
						<InputGroupAddon
							align="inline-end"
							className="text-muted-foreground"
						>
							<InputGroupButton
								type="button"
								variant="ghost"
								size="xs"
								aria-label="Clear search"
								onClick={onClearSearch}
							>
								<CloseIcon size={16} />
							</InputGroupButton>
						</InputGroupAddon>
					) : null}
				</InputGroup>
			</label>
		</PageHeader>
	);
}
