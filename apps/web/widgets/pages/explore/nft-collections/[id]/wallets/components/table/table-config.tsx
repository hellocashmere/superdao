import type { ElementType } from "react";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import { ArrowDownIcon, DotsIcon, LinkIcon, MirrorIcon, OpenseaIcon, TwitterIcon } from "@superdao/icons/outline";
import { Avatar, AvatarGroup, AvatarGroupCount, AvatarImage } from "@superdao/ui/components/avatar";
import { Badge } from "@superdao/ui/components/badge";
import { Button } from "@superdao/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@superdao/ui/components/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@superdao/ui/components/tooltip";
import type { FilterFn } from "@tanstack/react-table";
import {
	columnFilteringFeature,
	columnVisibilityFeature,
	createColumnHelper,
	createFilteredRowModel,
	createPaginatedRowModel,
	createSortedRowModel,
	filterFn_includesString,
	rowPaginationFeature,
	rowSortingFeature,
	sortFn_basic,
	tableFeatures,
} from "@tanstack/react-table";

import type { NftCollectionWalletView } from "@/entities/nft-collection";

import { getAgeDetails } from "./lib/get-age-details";
import type { WalletContact } from "./lib/get-contact-href";
import { getContactHref } from "./lib/get-contact-href";
import { isMissingValue } from "./lib/is-missing-value";

type BaseTableFeatures = ReturnType<typeof tableFeatures>;

const labelsIncludeAny: FilterFn<BaseTableFeatures, NftCollectionWalletView> = (row, _columnId, filterValue) => {
	const selectedLabels = filterValue as readonly string[];

	return selectedLabels.some((selectedLabel) => row.original.labels.some(({ title }) => title === selectedLabel));
};

labelsIncludeAny.autoRemove = (value) => !Array.isArray(value) || value.length === 0;

export const dataTableFeatures = tableFeatures({
	columnFilteringFeature,
	columnVisibilityFeature,
	rowPaginationFeature,
	rowSortingFeature,
	filteredRowModel: createFilteredRowModel(),
	paginatedRowModel: createPaginatedRowModel(),
	sortedRowModel: createSortedRowModel(),
	filterFns: {
		includesString: filterFn_includesString,
		labelsIncludeAny,
	},
	sortFns: {
		basic: sortFn_basic,
	},
});

export type DataTableFeatures = typeof dataTableFeatures;

export const filterLabels = [
	"Developer",
	"Luxury",
	"Hunter",
	"Crypto native",
	"Fashion",
	"Whale",
	"Gamer",
	"Music",
	"Farcaster",
	"DeFi",
	"ENS",
	"Art",
	"Influencer",
] as const;

export const columnLabels: Readonly<Record<string, string>> = {
	index: "#",
	activity: "Activity",
	age: "Age",
	balance: "Balance",
	contacts: "Contacts",
	labels: "Labels",
	nfts: "NFTs",
	rank: "Rank",
	twitter: "Twitter",
	wallet: "Wallet",
};

type VisibleWalletContact = Exclude<WalletContact, "email">;

const contactIcons: Readonly<Record<VisibleWalletContact, ElementType>> = {
	link: LinkIcon,
	mirror: MirrorIcon,
	opensea: OpenseaIcon,
	twitter: TwitterIcon,
};

const contactLabels: Readonly<Record<WalletContact, string>> = {
	email: "Email",
	link: "Website",
	mirror: "Mirror",
	opensea: "OpenSea",
	twitter: "Twitter",
};

const columnHelper = createColumnHelper<DataTableFeatures, NftCollectionWalletView>();

/**
 * Renders a placeholder for a missing table value.
 */
function emptyValue(message: string) {
	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<button
						type="button"
						className="rounded-sm text-[#717a8c] outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
						aria-label={message}
					/>
				}
			>
				–
			</TooltipTrigger>
			<TooltipContent>{message}</TooltipContent>
		</Tooltip>
	);
}

type RankVariant = "constructive" | "lime" | "orange";

/**
 * Selects the visual rank variant for a wallet's position in the audience.
 */
function getRankVariant(rank: number): RankVariant {
	if (rank >= 81) return "constructive";
	if (rank >= 61) return "lime";
	return "orange";
}

interface FormattedTableValueProps {
	value: number;
}

/**
 * Renders a compact numeric value in an NFT collection wallet table cell.
 */
function CompactTableValue({ value }: FormattedTableValueProps) {
	const { compact } = useNumberFormatter();
	return compact(value);
}

/**
 * Renders an NFT collection wallet balance as compact US dollars.
 */
function CurrencyTableValue({ value }: FormattedTableValueProps) {
	const { currency } = useNumberFormatter();
	return currency(value, "USD", {
		currencyDisplay: "narrowSymbol",
		maximumFractionDigits: 1,
		notation: "compact",
	});
}

/**
 * Renders a non-compact numeric value in an NFT collection wallet table cell.
 */
function NumberTableValue({ value }: FormattedTableValueProps) {
	const { number } = useNumberFormatter();
	return number(value, { maximumFractionDigits: 2 });
}

export const columns = columnHelper.columns([
	columnHelper.accessor("id", {
		id: "index",
		header: "#",
		enableHiding: false,
		sortFn: "basic",
		sortDescFirst: false,
		cell: ({ getValue }) => <span className="text-sm text-[#717a8c]">{getValue()}</span>,
	}),
	columnHelper.accessor("title", {
		id: "wallet",
		header: "Wallet",
		filterFn: "includesString",
		enableHiding: false,
		enableSorting: false,
		cell: ({ row }) => (
			<div className="flex items-center gap-3">
				<Avatar size="s">
					<AvatarImage
						src={row.original.avatar}
						alt=""
					/>
				</Avatar>
				<span className="truncate text-[15px]/6 font-semibold">{row.original.title}</span>
			</div>
		),
	}),
	columnHelper.accessor((wallet) => Number(wallet.rank), {
		id: "rank",
		sortFn: "basic",
		sortDescFirst: true,
		header: ({ column }) => (
			<button
				type="button"
				data-sort={column.getIsSorted() || "none"}
				className="group/sort inline-flex items-center gap-1 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Rank
				<ArrowDownIcon
					size={12}
					className="transition-transform group-data-[sort=asc]/sort:rotate-180 group-data-[sort=none]/sort:opacity-50"
				/>
			</button>
		),
		cell: ({ row }) => (
			<span
				data-variant={getRankVariant(row.original.rank)}
				className="inline-flex h-5 min-w-7 items-center justify-center rounded-md border-2 px-1 text-sm/5 font-semibold data-[variant=constructive]:border-constructive data-[variant=constructive]:bg-constructive/10 data-[variant=constructive]:text-constructive data-[variant=lime]:border-lime-400 data-[variant=lime]:bg-lime-400/10 data-[variant=lime]:text-lime-400 data-[variant=orange]:border-amber-500 data-[variant=orange]:bg-amber-500/10 data-[variant=orange]:text-amber-500"
			>
				<NumberTableValue value={row.original.rank} />
			</span>
		),
	}),
	columnHelper.accessor("age", {
		header: "Age",
		enableSorting: false,
		cell: ({ getValue, row }) => {
			const value = getValue();
			const details = row.original.ageDetails ?? getAgeDetails(value);

			return (
				<Tooltip>
					<TooltipTrigger
						render={
							<button
								type="button"
								className="rounded-sm text-[15px]/6 outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
								aria-label={`${value}: ${details}`}
							/>
						}
					>
						{value}
					</TooltipTrigger>
					<TooltipContent>{details}</TooltipContent>
				</Tooltip>
			);
		},
	}),
	columnHelper.accessor("labels", {
		header: "Labels ↗",
		filterFn: "labelsIncludeAny",
		enableSorting: false,
		cell: ({ getValue }) => {
			const labels = getValue();
			if (!labels.length) return emptyValue("No labels");

			const visibleLabels = labels.slice(0, 5);
			const hiddenLabels = labels.slice(5);

			return (
				<div className="flex flex-wrap gap-x-2 gap-y-0.5">
					{visibleLabels.map((label) => (
						<Badge
							key={label.title}
							color={label.variant === "green" ? "lime" : label.variant === "blue" ? "gray" : label.variant}
							variant="indicator"
						>
							{label.title}
						</Badge>
					))}
					{hiddenLabels.length > 0 ? (
						<Tooltip>
							<TooltipTrigger
								render={
									<button
										type="button"
										className="rounded-sm text-xs/4 font-semibold text-tabs-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
										aria-label={`${hiddenLabels.length} more labels`}
									/>
								}
							>
								+{hiddenLabels.length}
							</TooltipTrigger>
							<TooltipContent
								side="right"
								className="flex-col items-start gap-1.5"
							>
								{hiddenLabels.map((label) => (
									<Badge
										key={label.title}
										color={label.variant === "green" ? "lime" : label.variant === "blue" ? "gray" : label.variant}
										variant="indicator"
									>
										{label.title}
									</Badge>
								))}
							</TooltipContent>
						</Tooltip>
					) : null}
				</div>
			);
		},
	}),
	columnHelper.accessor("balance", {
		header: "Balance, $",
		enableSorting: false,
		cell: ({ getValue }) => {
			const value = getValue();
			return (
				<div className="text-right text-[15px]/6">
					{isMissingValue(value) ? emptyValue("No balance data") : <CurrencyTableValue value={value} />}
				</div>
			);
		},
	}),
	columnHelper.accessor("nfts", {
		header: "NFTs",
		enableSorting: false,
		cell: ({ getValue }) => {
			const value = getValue();
			return (
				<div className="text-right text-[15px]/6">
					{isMissingValue(value) ? emptyValue("No NFTs") : <CompactTableValue value={value} />}
				</div>
			);
		},
	}),
	columnHelper.accessor("twitter", {
		header: "Twitter",
		enableSorting: false,
		cell: ({ getValue }) => {
			const value = getValue();
			return (
				<div className="text-right text-[15px]/6">
					{isMissingValue(value) ? emptyValue("No linked Twitter account") : <CompactTableValue value={value} />}
				</div>
			);
		},
	}),
	columnHelper.accessor("activity", {
		header: "Activity",
		enableSorting: false,
		cell: ({ getValue }) => {
			const activity = getValue();
			if (!activity.length) return emptyValue("No activity");

			const visibleActivity = activity.slice(0, 3);
			const hiddenActivity = activity.slice(3);

			return (
				<AvatarGroup
					data-size="xs"
					overlap="compact"
				>
					{visibleActivity.map((item, index) => (
						<Avatar
							key={`${item.avatar}-${index}`}
							size="xs"
						>
							<AvatarImage
								src={item.avatar}
								alt=""
							/>
						</Avatar>
					))}
					{hiddenActivity.length > 0 ? (
						<Tooltip>
							<TooltipTrigger
								render={
									<AvatarGroupCount
										aria-label={`${hiddenActivity.length} more activities`}
										tabIndex={0}
										interactive
									/>
								}
							>
								+{hiddenActivity.length}
							</TooltipTrigger>
							<TooltipContent
								side="right"
								className="min-w-40 flex-col items-start gap-2 p-2"
							>
								{hiddenActivity.map((item, index) => (
									<span
										key={`${item.avatar}-${index}`}
										className="flex items-center gap-2 pr-2"
									>
										<Avatar size="xs">
											<AvatarImage
												src={item.avatar}
												alt=""
											/>
										</Avatar>
										<span>{item.title}</span>
									</span>
								))}
							</TooltipContent>
						</Tooltip>
					) : null}
				</AvatarGroup>
			);
		},
	}),
	columnHelper.accessor("contacts", {
		header: "Contacts",
		enableSorting: false,
		cell: ({ row }) => {
			const contacts = row.original.contacts.filter((contact): contact is VisibleWalletContact => contact !== "email");
			if (!contacts.length) return emptyValue("No linked account");

			return (
				<div className="flex items-center gap-1 text-icon">
					{contacts.map((contact) => {
						const Icon = contactIcons[contact];
						if (!Icon) return null;

						return (
							<a
								key={contact}
								href={getContactHref(contact, row.original)}
								target="_blank"
								rel="noreferrer"
								aria-label={`${contactLabels[contact]} contact for ${row.original.title}`}
								title={contactLabels[contact]}
								className="flex size-7 items-center justify-center rounded-md transition-colors outline-none hover:bg-secondary-hover hover:text-foreground focus-visible:bg-secondary-hover focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-95"
							>
								<Icon size={16} />
							</a>
						);
					})}
				</div>
			);
		},
	}),
	columnHelper.display({
		id: "actions",
		header: () => <span className="sr-only">Actions</span>,
		enableHiding: false,
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<Button
							type="button"
							variant="ghost"
							size="icon-sm"
							className="rounded-full!"
							aria-label={`Actions for ${row.original.title}`}
						/>
					}
				>
					<DotsIcon />
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className="w-44"
				>
					<DropdownMenuGroup>
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem onClick={() => void navigator.clipboard.writeText(row.original.title)}>
							Make a copy
						</DropdownMenuItem>
						<DropdownMenuItem>Favorite</DropdownMenuItem>
						<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		),
	}),
]);
