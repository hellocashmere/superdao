"use client";

import type { ComponentPropsWithRef } from "react";
import { useState } from "react";

import {
  Sidebar as SidebarPrimitive,
  SidebarContent as SidebarContentPrimitive,
  SidebarFooter as SidebarFooterPrimitive,
  SidebarHeader as SidebarHeaderPrimitive,
} from "@superdao/ui/components/sidebar";

import { useGetRecentSearchResults, useGetSearchResults, useSearchStore } from "@/entities/search";

import { HelpMenu } from "./components/help-menu";
import { OrganizationSwitcher } from "./components/organization-switcher";
import { ProfileMenu } from "./components/profile-menu";
import { SidebarSearchPanel, SidebarSearchTrigger } from "./components/search";
import { SidebarNavigation } from "./components/sidebar-navigation";

export interface SidebarProps extends ComponentPropsWithRef<typeof SidebarPrimitive> {}

/**
 * Renders the complete application sidebar with navigation and global search.
 */
export function Sidebar({ ref, ...props }: SidebarProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const recentSearchIDs = useSearchStore((state) => state.recentSearchIDs);
  const addRecentSearch = useSearchStore((state) => state.addRecentSearch);
  const searchResultsQuery = useGetSearchResults(searchQuery);
  const recentSearchResultsQuery = useGetRecentSearchResults(recentSearchIDs);
  const hasSearchQuery = searchQuery.trim().length > 0;

  if (searchResultsQuery.error) throw searchResultsQuery.error;
  if (recentSearchResultsQuery.error) throw recentSearchResultsQuery.error;

  const changeSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const closeSearch = () => {
    setIsSearchActive(false);
    setSearchQuery("");
  };

  return (
    <SidebarPrimitive
      ref={ref}
      data-search-active={isSearchActive ? "" : undefined}
      {...props}
    >
      {isSearchActive ? (
        <SidebarSearchPanel
          isLoading={hasSearchQuery ? searchResultsQuery.isFetching : recentSearchResultsQuery.isFetching}
          query={searchQuery}
          searchResults={searchResultsQuery.data ?? []}
          recentSearchResults={recentSearchResultsQuery.data ?? []}
          onQueryChange={changeSearchQuery}
          onClose={closeSearch}
          onResultSelect={(resultID) => {
            addRecentSearch(resultID);
            closeSearch();
          }}
        />
      ) : (
        <>
          <SidebarHeaderPrimitive>
            <OrganizationSwitcher />
            <SidebarSearchTrigger onActivate={() => setIsSearchActive(true)} />
          </SidebarHeaderPrimitive>

          <SidebarContentPrimitive>
            <SidebarNavigation />
          </SidebarContentPrimitive>

          <SidebarFooterPrimitive className="h-28 justify-end">
            <HelpMenu />
            <ProfileMenu />
          </SidebarFooterPrimitive>
        </>
      )}
    </SidebarPrimitive>
  );
}
