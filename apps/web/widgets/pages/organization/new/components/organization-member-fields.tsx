import type { ComponentPropsWithRef } from "react";

import { DoneIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Input } from "@superdao/ui/components/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@superdao/ui/components/select";

import { isEthereumAddress } from "@/shared/lib/crypto";

import type { OrganizationMemberDraft } from "../model/form";
import { organizationMemberRoles } from "../model/form";

export interface OrganizationMemberFieldsProps extends ComponentPropsWithRef<"fieldset"> {
	draft: OrganizationMemberDraft;
	index: number;
	onDraftChange: (draftID: number, changes: Partial<OrganizationMemberDraft>) => void;
	onRemove: (draftID: number) => void;
}

/**
 * Renders wallet, role, and email controls for one invited member.
 */
export function OrganizationMemberFields({
	ref,
	className,
	draft,
	index,
	onDraftChange,
	onRemove,
	...props
}: OrganizationMemberFieldsProps) {
	const hasWallet = Boolean(draft.wallet.trim());
	const isWalletValid = !hasWallet || isEthereumAddress(draft.wallet);

	return (
		<fieldset
			ref={ref}
			data-slot="organization-member-fields"
			data-state={!hasWallet ? "empty" : isWalletValid ? "valid" : "invalid"}
			className={cn("space-y-4", className)}
			{...props}
		>
			<legend className="sr-only">Member {index + 1}</legend>
			<div className="flex h-10 items-center">
				<span className="text-[15px]/6 font-semibold">
					Member <span className="ml-2 text-[#717a8c]">{index + 1}</span>
				</span>
				<button
					type="button"
					className="ml-auto text-[13px]/[18px] font-semibold text-[#717a8c] transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
					onClick={() => onRemove(draft.id)}
				>
					Remove
				</button>
			</div>

			<div className="relative">
				<Input
					value={draft.wallet}
					placeholder="Wallet address"
					aria-label={`Wallet address for member ${index + 1}`}
					aria-invalid={hasWallet && !isWalletValid}
					className="pr-11"
					autoCapitalize="none"
					autoCorrect="off"
					spellCheck={false}
					onChange={(event) => onDraftChange(draft.id, { wallet: event.target.value })}
				/>
				{hasWallet && isWalletValid ? (
					<DoneIcon
						className="pointer-events-none absolute top-3 right-4 size-4 text-[#50e3a4]"
						aria-hidden="true"
					/>
				) : null}
				{hasWallet && !isWalletValid ? (
					<span className="mt-1 block text-[13px]/[18px] text-destructive">Wallet address must start with 0x</span>
				) : null}
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<Select
					value={draft.role}
					onValueChange={(value) =>
						onDraftChange(draft.id, {
							role: value as OrganizationMemberDraft["role"],
						})
					}
				>
					<SelectTrigger
						aria-label={`Role for member ${index + 1}`}
						className="w-full border-0 bg-field px-4 text-[15px]/6 font-normal"
					>
						<SelectValue placeholder="Select role" />
					</SelectTrigger>
					<SelectContent align="start">
						<SelectGroup>
							{organizationMemberRoles.map((role) => (
								<SelectItem
									key={role}
									value={role}
								>
									{role}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<Input
					type="email"
					value={draft.email}
					placeholder="Email"
					aria-label={`Email for member ${index + 1}`}
					onChange={(event) => onDraftChange(draft.id, { email: event.target.value })}
				/>
			</div>
		</fieldset>
	);
}
