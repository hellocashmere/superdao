import type { ReactNode } from "react";

import { SidebarProvider } from "@superdao/ui/components/sidebar";
import { Toaster } from "@superdao/ui/components/toast";

import { PageContent } from "@/shared/ui/page-layout";
import { Sidebar } from "@/widgets/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

/**
 * Provides the shared application shell for dashboard routes.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Toaster>
      <SidebarProvider data-slot="application-shell">
        <Sidebar />
        <PageContent>{children}</PageContent>
      </SidebarProvider>
    </Toaster>
  );
}
