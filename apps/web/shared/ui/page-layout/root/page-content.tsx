import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { SidebarInset, SidebarTrigger } from "@superdao/ui/components/sidebar";

export interface PageContentProps extends ComponentPropsWithRef<typeof SidebarInset> {}

/**
 * Renders the main page content beside the sidebar.
 */
export function PageContent({ children, className, ref, ...props }: PageContentProps) {
  return (
    <SidebarInset
      ref={ref}
      data-slot="page-content"
      className={cn("min-h-svh min-w-0", className)}
      {...props}
    >
      <div
        data-slot="mobile-sidebar-controls"
        className="flex h-14 shrink-0 items-center px-5 md:hidden"
      >
        <SidebarTrigger aria-label="Open navigation" />
      </div>
      {children}
    </SidebarInset>
  );
}

export interface PageHeaderProps extends ComponentPropsWithRef<"header"> {}

/**
 * Renders page-specific heading and action content.
 */
export function PageHeader({ className, ref, ...props }: PageHeaderProps) {
  return (
    <header
      ref={ref}
      data-slot="content-header"
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

export interface PageBodyProps extends ComponentPropsWithRef<"section"> {}

/**
 * Renders the primary page-specific content section.
 */
export function PageBody({ className, ref, ...props }: PageBodyProps) {
  return (
    <section
      ref={ref}
      data-slot="content-body"
      className={cn("min-h-0 flex-1", className)}
      {...props}
    />
  );
}

export interface PageFooterProps extends ComponentPropsWithRef<"footer"> {}

/**
 * Renders optional page-specific footer content.
 */
export function PageFooter({ className, ref, ...props }: PageFooterProps) {
  return (
    <footer
      ref={ref}
      data-slot="content-footer"
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}
