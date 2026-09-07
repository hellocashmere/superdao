"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@superdao/lib/utils";

import { AudienceStoreProvider, useAudienceStore } from "@/entities/audience";
import { MemberStoreProvider, useMemberStore } from "@/entities/member";
import { OrganizationStoreProvider, useOrganizationStore } from "@/entities/organization";
import { SearchStoreProvider, useSearchStore } from "@/entities/search";
import { SessionStoreProvider, useSessionStore } from "@/entities/session";
import { UserStoreProvider, useUserStore } from "@/entities/user";
import { QueryClientProvider } from "@/shared/api/tanstack";

export interface AppStateGateProps extends ComponentPropsWithRef<"div"> {
  children: ReactNode;
}

/**
 * Waits for persisted state and redirects between public and private routes.
 */
export function AppStateGate({ children, className, ref, ...props }: AppStateGateProps) {
  const pathname = usePathname();
  const router = useRouter();
  const audienceHydrated = useAudienceStore((state) => state.hasHydrated);
  const memberHydrated = useMemberStore((state) => state.hasHydrated);
  const organizationHydrated = useOrganizationStore((state) => state.hasHydrated);
  const searchHydrated = useSearchStore((state) => state.hasHydrated);
  const sessionHydrated = useSessionStore((state) => state.hasHydrated);
  const sessionStatus = useSessionStore((state) => state.status);
  const userHydrated = useUserStore((state) => state.hasHydrated);
  const hasHydrated =
    audienceHydrated && memberHydrated && organizationHydrated && searchHydrated && sessionHydrated && userHydrated;
  const isAuthRootRoute = pathname === "/auth";
  const isAuthRoute = isAuthRootRoute || pathname.startsWith("/auth/");
  const isComponentCatalogRoute = pathname === "/_components";
  const shouldRedirectToAuth = hasHydrated && !isAuthRoute && !isComponentCatalogRoute && sessionStatus === "anonymous";
  const shouldRedirectToDashboard = hasHydrated && isAuthRootRoute && sessionStatus === "authenticated";

  useEffect(() => {
    if (shouldRedirectToAuth) {
      router.replace("/auth");
    } else if (shouldRedirectToDashboard) {
      router.replace("/");
    }
  }, [router, shouldRedirectToAuth, shouldRedirectToDashboard]);

  const isReady = isComponentCatalogRoute || (hasHydrated && !shouldRedirectToAuth && !shouldRedirectToDashboard);

  return (
    <div
      {...props}
      ref={ref}
      data-slot="app-state-gate"
      data-state={isReady ? "ready" : "loading"}
      className={cn(
        "data-[state=loading]:flex data-[state=loading]:min-h-svh data-[state=loading]:items-center data-[state=loading]:justify-center data-[state=loading]:bg-background data-[state=ready]:contents",
        className
      )}
      role={isReady ? undefined : "status"}
      aria-label={isReady ? undefined : "Loading application"}
    >
      {isReady ? (
        children
      ) : (
        <span className="size-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      )}
    </div>
  );
}

export interface ProvidersProps {
  children: ReactNode;
}

/**
 * Initializes the application's client-side providers.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider>
      <AudienceStoreProvider>
        <SessionStoreProvider>
          <UserStoreProvider>
            <SearchStoreProvider>
              <OrganizationStoreProvider>
                <MemberStoreProvider>
                  <AppStateGate>{children}</AppStateGate>
                </MemberStoreProvider>
              </OrganizationStoreProvider>
            </SearchStoreProvider>
          </UserStoreProvider>
        </SessionStoreProvider>
      </AudienceStoreProvider>
    </QueryClientProvider>
  );
}
