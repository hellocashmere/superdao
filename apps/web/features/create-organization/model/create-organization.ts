import type { MemberRole } from "@/entities/member";

export interface OrganizationMemberDraft {
  email: string;
  id: number;
  role: MemberRole | null;
  wallet: string;
}

export const initialOrganizationMemberDrafts: readonly OrganizationMemberDraft[] = [
  { email: "", id: 1, role: null, wallet: "" },
  { email: "", id: 2, role: null, wallet: "" },
];

export const organizationMemberRoles: readonly MemberRole[] = ["Owner", "Admin", "Member"];

/** Produces a compact fallback member name from a wallet address. */
export function formatOrganizationWallet(wallet: string) {
  if (wallet.length <= 13) {
    return wallet;
  }

  return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
}
