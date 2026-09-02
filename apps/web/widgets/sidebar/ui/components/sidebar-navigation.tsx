import type { ComponentPropsWithRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArrowDownIcon } from "@superdao/icons";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@superdao/ui/components/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@superdao/ui/components/sidebar";

import { sidebarNavigation } from "../../model/navigation";

export interface SidebarNavigationProps extends ComponentPropsWithRef<"nav"> {}

/**
 * Renders the application navigation and its collapsible sections.
 */
export function SidebarNavigation({ className, ref, ...props }: SidebarNavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      ref={ref}
      id="sidebar-navigation"
      data-slot="sidebar-navigation"
      className={className}
      aria-label="Primary navigation"
      {...props}
    >
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {sidebarNavigation.map((item) => {
              const Icon = item.icon;
              const isItemActive = pathname === item.href;
              const hasActiveChild = item.children?.some(
                (child) => pathname === child.href || pathname.startsWith(`${child.href}/`)
              );

              if (!item.children) {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isItemActive}
                      render={<Link href={item.href} />}
                    >
                      <Icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              return (
                <Collapsible
                  key={item.title}
                  defaultOpen={item.defaultOpen || isItemActive || hasActiveChild}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger
                      className="group/collapsible-trigger"
                      render={<SidebarMenuButton isActive={isItemActive} />}
                    >
                      <Icon />
                      <span>{item.title}</span>
                      <ArrowDownIcon
                        size={14}
                        className="ml-auto !size-4 shrink-0 transition-transform !duration-0 group-data-panel-open/collapsible-trigger:rotate-180"
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children.map((child) => (
                          <SidebarMenuSubItem key={child.title}>
                            <SidebarMenuSubButton
                              isActive={pathname === child.href || pathname.startsWith(`${child.href}/`)}
                              render={<Link href={child.href} />}
                            >
                              <span>{child.title}</span>
                              {child.meta ? (
                                <span className="ml-auto text-xs text-sidebar-muted-foreground tabular-nums">
                                  {child.meta}
                                </span>
                              ) : null}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </nav>
  );
}
