import type { ComponentPropsWithRef } from "react"
import { cn } from "@superdao/ui/lib/utils"
import { SearchIcon } from "@superdao/icons"
import { SidebarInput } from "@superdao/ui/components/sidebar"

export interface SidebarSearchProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the sidebar search field.
 */
export function SidebarSearch({
  className,
  ref,
  ...props
}: SidebarSearchProps) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-search"
      className={cn("px-5 py-3.5", className)}
      {...props}
    >
      <div className="relative">
        <SearchIcon
          size={16}
          className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-sidebar-muted-foreground"
        />
        <SidebarInput
          aria-label="Search"
          className="pl-9 text-sm/[20px] tracking-[-0.24px] placeholder:text-muted-foreground"
          placeholder="Search"
        />
      </div>
    </div>
  )
}