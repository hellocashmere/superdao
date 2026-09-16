import type { ComponentPropsWithRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { CloseIcon, DollarIcon, GroupIcon, SearchIcon } from "@superdao/icons";
import { MusicRBoldIcon } from "@superdao/icons/bold";
import { cn } from "@superdao/lib/utils";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@superdao/ui/components/input-group";
import { Spinner } from "@superdao/ui/components/spinner";

import type { SearchResultView } from "@/entities/search";

export interface SidebarSearchTriggerProps extends ComponentPropsWithRef<"div"> {
	onActivate: () => void;
}

/**
 * Renders the inactive search field that opens the dedicated search mode.
 */
export function SidebarSearchTrigger({ ref, className, onActivate, ...props }: SidebarSearchTriggerProps) {
	return (
		<div
			ref={ref}
			data-slot="sidebar-search-trigger"
			className={cn("px-5 py-3.5", className)}
			{...props}
		>
			<InputGroup variant="sidebar-search-trigger">
				<InputGroupAddon>
					<SearchIcon />
				</InputGroupAddon>
				<InputGroupInput
					readOnly
					type="search"
					aria-label="Open search"
					placeholder="Audience, wallet, collection..."
					onClick={onActivate}
					onFocus={onActivate}
				/>
			</InputGroup>
		</div>
	);
}

export interface SidebarSearchAvatarProps extends ComponentPropsWithRef<"div"> {
	result: SearchResultView;
}

/**
 * Renders the avatar or category glyph for a global search result.
 */
export function SidebarSearchAvatar({ ref, className, result, ...props }: SidebarSearchAvatarProps) {
	let glyph = null;

	if (result.glyph === "audience") {
		glyph = <GroupIcon size={16} />;
	} else if (result.glyph === "label") {
		glyph = <DollarIcon size={16} />;
	} else if (result.glyph === "music") {
		glyph = <MusicRBoldIcon size={16} />;
	}

	return (
		<div
			ref={ref}
			data-slot="sidebar-search-avatar"
			data-glyph={result.glyph}
			className={cn(
				"relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#343a46] text-[#a2a8b4] data-[glyph=label]:bg-[#24a4c91a] data-[glyph=label]:text-[#24a4c9] data-[glyph=music]:bg-[#ffda1a14] data-[glyph=music]:text-[#ffda1a]",
				className
			)}
			{...props}
		>
			{result.avatarSrc ? (
				<Image
					src={result.avatarSrc}
					alt=""
					width={32}
					height={32}
					className="size-full rounded-full object-cover"
				/>
			) : (
				glyph
			)}
		</div>
	);
}

export interface SidebarSearchPanelProps extends ComponentPropsWithRef<"div"> {
	isLoading: boolean;
	onClose: () => void;
	onQueryChange: (query: string) => void;
	onResultSelect: (resultID: string) => void;
	query: string;
	recentSearchResults: readonly SearchResultView[];
	searchResults: readonly SearchResultView[];
}

/**
 * Renders the active full-height global search experience in the sidebar.
 */
export function SidebarSearchPanel({
	ref,
	className,
	isLoading,
	onClose,
	onQueryChange,
	onResultSelect,
	query,
	recentSearchResults,
	searchResults,
	...props
}: SidebarSearchPanelProps) {
	const hasQuery = Boolean(query.trim());
	const visibleResults = hasQuery ? searchResults : recentSearchResults;
	const heading = hasQuery
		? `${searchResults.length} ${searchResults.length === 1 ? "result" : "results"}`
		: "Recent searches";

	return (
		<div
			ref={ref}
			data-slot="sidebar-search-panel"
			className={cn("relative flex min-h-0 flex-1 flex-col", className)}
			{...props}
		>
			<div className="flex h-17 shrink-0 items-center px-5">
				<InputGroup variant="sidebar-search-field">
					<InputGroupAddon>
						<SearchIcon />
					</InputGroupAddon>
					<InputGroupInput
						autoFocus
						type="search"
						aria-label="Search audience, wallet, collection, label, token, or dapp"
						placeholder="Audience, wallet, collection..."
						value={query}
						onChange={(event) => onQueryChange(event.target.value)}
						onKeyDown={(event) => {
							if (event.key === "Escape") {
								event.preventDefault();
								onClose();
							}
						}}
					/>
					<InputGroupAddon align="inline-end">
						<InputGroupButton
							size="icon-xs"
							aria-label="Close search"
							onClick={onClose}
						>
							<CloseIcon className="size-3" />
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
			</div>

			{isLoading ? (
				<div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 items-center justify-center">
					<Spinner
						size="medium"
						variant="subdued"
					/>
				</div>
			) : visibleResults.length > 0 ? (
				<div className="min-h-0 flex-1 overflow-y-auto pb-4">
					<h2 className="px-5 pt-1 pb-2 text-sm/5 font-semibold text-[#a2a8b4]">{heading}</h2>
					<div className="flex flex-col gap-0.5">
						{visibleResults.map((result) => (
							<Link
								key={result.id}
								href={result.href}
								className="flex h-11.5 w-full items-center gap-3 px-5 py-1 outline-none hover:bg-[#d0dcf50a] focus-visible:bg-[#d0dcf50a]"
								onClick={() => onResultSelect(result.id)}
							>
								<SidebarSearchAvatar result={result} />
								<span className="flex min-w-0 flex-col items-start">
									<span className="max-w-full truncate text-sm/5 font-semibold text-white">{result.title}</span>
									<span className="max-w-full truncate text-[13px]/[18px] text-[#a2a8b4]">{result.type}</span>
								</span>
							</Link>
						))}
					</div>
				</div>
			) : (
				<div className="absolute inset-x-5 top-1/2 -translate-y-1/2 text-center">
					{hasQuery ? (
						<div className="flex flex-col gap-2">
							<h2 className="text-[17px]/[21px] font-semibold text-white">No results</h2>
							<p className="text-[13px]/[18px] text-[#a2a8b4]">There is no results by your request</p>
						</div>
					) : (
						<p className="text-[13px]/[18px] text-[#a2a8b4]">
							Search for audience, wallet or ENS,
							<br />
							NFT collection, label, token, and dapp
						</p>
					)}
				</div>
			)}
		</div>
	);
}
