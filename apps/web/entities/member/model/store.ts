"use client";

import { createContext, useContext } from "react";

import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import type { CommunityMember, CreateMemberInput, MemberState, MemberStore } from "./types/types";

const featuredMembers: readonly CommunityMember[] = [
  {
    id: "cashmere-author",
    index: 1,
    name: "cashmere.ton",
    address: "0x8998d5f8f90d7a09a5fc7c1454f785cfb570c441",
    avatar: "/avatars/cashmere.png",
    role: "Owner",
    assignedBy: null,
    joinDate: "Jun 12, 2023",
    organizationID: "acme",
  },
  {
    id: "aster-admin",
    index: 2,
    name: "Aster Quinn",
    address: "0x4e51713a92bc0646213b27e697b5e93a604f6f01",
    avatar: "/avatars/43c942bced82918ce823e09d161b77af.png",
    role: "Admin",
    assignedBy: "cashmere.ton",
    joinDate: "Jun 12, 2023",
    organizationID: "acme",
  },
  {
    id: "wallet-purple",
    index: 3,
    name: "orbitkid.eth",
    address: "0x76f50e43f49ca9332091f62c70fef1bc9f7a35d6",
    avatar: "/avatars/13f789cec096eaa9226cb1759fc74954.png",
    role: "Member",
    assignedBy: "cashmere.ton",
    joinDate: "Jun 24, 2023",
    organizationID: "acme",
  },
  {
    id: "leona-member",
    index: 4,
    name: "Leona Park",
    address: "0x1c49d9092ae0a5453ef989ed33141356ab1154e2",
    avatar: "/avatars/190842423a18e1e6e14e3cc9e06bf656.png",
    role: "Member",
    assignedBy: "Aster Quinn",
    joinDate: "Jun 25, 2023",
    organizationID: "acme",
  },
];

const additionalMemberNames = [
  "vitalik.eth",
  "olivia.ton",
  "satoshi.club",
  "marina.eth",
  "alexander.ton",
  "cryptonative.eth",
  "artcollector.ton",
  "0xa91...8c42",
  "defigirl.eth",
  "maxim.ton",
  "hunter.eth",
  "0xf43...91ae",
  "luna.community",
  "nftbear.eth",
  "andrew.ton",
  "0xb72...420f",
  "dao.builder",
  "sophia.eth",
  "web3native.ton",
  "0x902...a83d",
  "digitalnomad.eth",
  "sergey.ton",
  "onchain.artist",
  "0x114...ce90",
  "anna.eth",
  "metaverse.ton",
  "collector.eth",
  "0xd70...131f",
] as const;

const memberAvatars = [
  "/avatars/cashmere.png",
  "/avatars/43c942bced82918ce823e09d161b77af.png",
  "/avatars/13f789cec096eaa9226cb1759fc74954.png",
  "/avatars/190842423a18e1e6e14e3cc9e06bf656.png",
  "/avatars/1f79e197d628f529836a2ddd3d4c93d5.png",
  "/avatars/00f38963ebda80fb6bcc422f6d6cd499.png",
  "/avatars/03622090ca9f95534d14ace6e6e833e1.png",
  "/avatars/3d5787d6b930ec2c91f1a13b23a3472e.png",
  "/avatars/3f9a56d5d753b5b4baf302c1fdebcd30.png",
  "/avatars/0a2174d82cc30048a9a91a9d91a550fc.png",
  "/avatars/58751da0f91c121208c1e8bc1f75079f.png",
  "/avatars/58e40e9f0902cd99ee1bd309ec0a4d4a.png",
  "/avatars/0c31cbe0b37ca2f5c0cd057e3ef4fed3.png",
  "/avatars/620987817996026204ab087b324e4465.png",
  "/avatars/68288521b447c61512f2b519dad476b6.png",
  "/avatars/0d285ad92806c93fcc7d680188a0c6e8.png",
  "/avatars/8011097d544d3394192a4931205299aa.png",
  "/avatars/8553af2b045a6752c135140a88835e32.png",
  "/avatars/13dc38b7e837a16722c6c7b6a695fa46.png",
  "/avatars/16a336dbd2f769162d56ef6eb90d8f75.png",
  "/avatars/199f61e6ecd63f52024e2db2f37f1364.png",
  "/avatars/25e31f4e1df7b5c0376e9d3c12aae2cd.png",
  "/avatars/b52d052299464663127e357ee72393e6.png",
  "/avatars/bd0ad205c2a1919c89917a4cb4edd5f4.png",
  "/avatars/cb44db6f71d4a369fcc8632253735afb.png",
  "/avatars/cd4e088ebcf6499cd849d5a20f2d5a01.png",
  "/avatars/d6cf948a78224634f28f3bddb1a22d1f.png",
  "/avatars/d850093e58e38e44a4152003d18a060e.png",
  "/avatars/dbddda90c038310e2d96e4e642c8be6b.png",
  "/avatars/dbde396050d6172077732d83de635853.png",
  "/avatars/2829f4b7e9841e3f8903815c4a10013c.png",
  "/avatars/284a1fd8d44d15aa9dbb11ff2169ddae.png",
] as const;

function getMemberAvatar(index: number) {
  return memberAvatars[(index - 1) % memberAvatars.length]!;
}

const additionalMembers: readonly CommunityMember[] = additionalMemberNames.map((name, position) => {
  const index = featuredMembers.length + position + 1;
  const addressSuffix = index.toString(16).padStart(4, "0");

  return {
    id: `member-${index}`,
    index,
    name,
    address: `0x${index.toString(16).padStart(8, "0")}a77f34e29bc80d4f639a${addressSuffix}`,
    avatar: getMemberAvatar(index),
    role: position % 7 === 0 ? "Admin" : "Member",
    assignedBy: position % 3 === 0 ? "Aster Quinn" : "cashmere.ton",
    joinDate: `Jul ${String((position % 28) + 1).padStart(2, "0")}, 2023`,
    organizationID: "acme",
  };
});

export const initialMembers: readonly CommunityMember[] = [...featuredMembers, ...additionalMembers];

function reindexMembers(members: readonly CommunityMember[]) {
  const indexes = new Map<string, number>();

  return members.map((member) => {
    const index = (indexes.get(member.organizationID) ?? 0) + 1;
    indexes.set(member.organizationID, index);
    return { ...member, index };
  });
}

/** Creates an isolated persisted organization-member store. */
export function createMemberStore() {
  return createStore<MemberStore>()(
    persist(
      (set) => ({
        hasHydrated: false,
        members: initialMembers,
        addMembers: (inputs) =>
          set((state) => {
            const joinDate = new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(new Date());
            const members = inputs.map<CommunityMember>((input, position) => ({
              id: `member-${crypto.randomUUID()}`,
              index: 0,
              name: input.name,
              address: input.address,
              avatar: getMemberAvatar(state.members.length + position + 1),
              role: input.role,
              assignedBy: input.assignedBy,
              joinDate,
              organizationID: input.organizationID,
            }));

            return { members: reindexMembers([...state.members, ...members]) };
          }),
        changeMemberRole: (memberID, role) =>
          set((state) => ({
            members: state.members.map((member) => (member.id === memberID ? { ...member, role } : member)),
          })),
        removeMember: (memberID) =>
          set((state) => ({
            members: reindexMembers(state.members.filter((member) => member.id !== memberID)),
          })),
        resetMembers: () => set({ members: initialMembers }),
        setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      }),
      {
        name: "superdao:members",
        version: 5,
        migrate: (persistedState) => {
          const state = persistedState as Pick<MemberState, "members">;

          return {
            ...state,
            members: state.members.map((member) => {
              const initialMember = initialMembers.find(({ id }) => id === member.id);

              return {
                ...member,
                avatar: initialMember?.avatar ?? getMemberAvatar(member.index),
                assignedBy: member.assignedBy === "frontman.eth" ? "cashmere.ton" : member.assignedBy,
                name: member.id === "cashmere-author" || member.name === "frontman.eth" ? "cashmere.ton" : member.name,
              };
            }),
          };
        },
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
        partialize: ({ members }) => ({ members }),
      }
    )
  );
}

export type MemberStoreApi = ReturnType<typeof createMemberStore>;

export const MemberStoreContext = createContext<MemberStoreApi | null>(null);

/**
 * Selects reactive state from the nearest organization-member store.
 */
export function useMemberStore<T>(selector: (state: MemberStore) => T) {
  const store = useContext(MemberStoreContext);

  if (!store) {
    throw new Error("useMemberStore must be used within MemberStoreProvider");
  }

  return useStore(store, selector);
}
