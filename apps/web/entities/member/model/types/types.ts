/**
 * Roles available to a community member.
 */
export type MemberRole = "Owner" | "Admin" | "Member";

/**
 * Member details displayed in organization member management views.
 */
export interface CommunityMember {
	/**
	 * Member wallet address.
	 */
	address: string;
	/**
	 * ID of the assigning user.
	 */
	assignedBy: string | null;
	/**
	 * Avatar URL.
	 */
	avatar: string;
	/**
	 * Unique entity ID.
	 */
	id: string;
	/**
	 * Stable member table position.
	 */
	index: number;
	/**
	 * Date when the member joined.
	 */
	joinDate: string;
	/**
	 * Community member display name.
	 */
	name: string;
	/**
	 * ID of the active organization.
	 */
	organizationID: string;
	/**
	 * Assigned organization role.
	 */
	role: MemberRole;
}

/**
 * Data required to add a member to an organization.
 */
export interface CreateMemberInput {
	/**
	 * Member wallet address.
	 */
	address: string;
	/**
	 * ID of the assigning user.
	 */
	assignedBy: string;
	/**
	 * Email address.
	 */
	email?: string;
	/**
	 * Display name submitted for the new member.
	 */
	name: string;
	/**
	 * ID of the active organization.
	 */
	organizationID: string;
	/**
	 * Assigned organization role.
	 */
	role: MemberRole;
}

/**
 * Persisted state owned by the organization-member store.
 */
export interface MemberState {
	/**
	 * Whether persisted state has hydrated.
	 */
	hasHydrated: boolean;
	/**
	 * Organization members held in client state.
	 */
	members: readonly CommunityMember[];
}

/**
 * Mutations supported by the organization-member store.
 */
export interface MemberActions {
	/**
	 * Adds member drafts to the organization.
	 */
	addMembers: (members: readonly CreateMemberInput[]) => void;
	/**
	 * Changes an organization member's role.
	 */
	changeMemberRole: (memberID: string, role: MemberRole) => void;
	/**
	 * Removes a member from the organization.
	 */
	removeMember: (memberID: string) => void;
	/**
	 * Restores the initial member state.
	 */
	resetMembers: () => void;
	/**
	 * Records that persisted state has hydrated.
	 */
	setHasHydrated: (hasHydrated: boolean) => void;
}

/**
 * Complete state and action contract for organization members.
 */
export type MemberStore = MemberState & MemberActions;
