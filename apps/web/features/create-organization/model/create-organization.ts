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

/** Returns whether an optional wallet draft has a supported address prefix. */
export function isOrganizationWalletValid(wallet: string) {
  const value = wallet.trim();

  return value === "" || /^0x.+/i.test(value);
}

/** Produces a compact fallback member name from a wallet address. */
export function formatOrganizationWallet(wallet: string) {
  if (wallet.length <= 13) {
    return wallet;
  }

  return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
}

/** Produces a URL-safe identifier for a newly created audience. */
export function createAudienceID(name: string) {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "new"
  );
}
