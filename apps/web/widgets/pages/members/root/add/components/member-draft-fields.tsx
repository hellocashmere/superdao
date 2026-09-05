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

import type { MemberRole } from "@/entities/member";

export interface MemberDraft {
  id: number;
  wallet: string;
  role: MemberRole | null;
  email: string;
}

const roles: readonly MemberRole[] = ["Owner", "Admin", "Member"];

export interface MemberDraftFieldsProps extends ComponentPropsWithRef<"fieldset"> {
  draft: MemberDraft;
  index: number;
  canRemove: boolean;
  onDraftChange: (draftID: number, changes: Partial<MemberDraft>) => void;
  onRemove: (draftID: number) => void;
}

/**
 * Renders editable wallet, role, and email fields for one member.
 */
export function MemberDraftFields({
  className,
  ref,
  draft,
  index,
  canRemove,
  onDraftChange,
  onRemove,
  ...props
}: MemberDraftFieldsProps) {
  return (
    <fieldset
      {...props}
      ref={ref}
      data-slot="member-draft"
      data-filled={Boolean(draft.wallet)}
      className={cn("space-y-4", className)}
    >
      <legend className="sr-only">Member {index + 1}</legend>
      <div className="flex h-10 items-center">
        <span className="text-[15px]/6 font-semibold">
          Member <span className="text-[#717a8c]">{index + 1}</span>
        </span>
        {canRemove ? (
          <button
            type="button"
            className="ml-auto text-[13px]/[18px] font-semibold text-[#717a8c] transition-colors hover:text-foreground"
            onClick={() => onRemove(draft.id)}
          >
            Remove
          </button>
        ) : null}
      </div>

      <div className="relative">
        <Input
          value={draft.wallet}
          placeholder="Wallet address"
          aria-label={`Wallet address for member ${index + 1}`}
          className={draft.wallet ? "pr-11" : undefined}
          onChange={(event) => onDraftChange(draft.id, { wallet: event.target.value })}
        />
        {draft.wallet ? (
          <DoneIcon
            size={24}
            className="pointer-events-none absolute top-2 right-3 text-[#50e3a4]"
            aria-hidden="true"
          />
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          value={draft.role}
          onValueChange={(value) => onDraftChange(draft.id, { role: value as MemberRole })}
        >
          <SelectTrigger
            aria-label={`Role for member ${index + 1}`}
            size="default"
            className="w-full border-0 bg-field px-4 text-[15px]/6 font-normal"
          >
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {roles.map((role) => (
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
