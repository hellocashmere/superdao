/**
 * Roles available to a community member.
 */
export type MemberRole = "Owner" | "Admin" | "Member";

/**
 * Member details displayed in organization member management views.
 */
export interface CommunityMember {
  address: string;
  assignedBy: string | null;
  avatar: string;
  id: string;
  index: number;
  joinDate: string;
  name: string;
  organizationID: string;
  role: MemberRole;
}

/**
 * Data required to add a member to an organization.
 */
export interface CreateMemberInput {
  address: string;
  assignedBy: string;
  email?: string;
  name: string;
  organizationID: string;
  role: MemberRole;
}

/**
 * Persisted state owned by the organization-member store.
 */
export interface MemberState {
  hasHydrated: boolean;
  members: readonly CommunityMember[];
}

/**
 * Mutations supported by the organization-member store.
 */
export interface MemberActions {
  addMembers: (members: readonly CreateMemberInput[]) => void;
  changeMemberRole: (memberID: string, role: MemberRole) => void;
  removeMember: (memberID: string) => void;
  resetMembers: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

/**
 * Complete state and action contract for organization members.
 */
export type MemberStore = MemberState & MemberActions;
