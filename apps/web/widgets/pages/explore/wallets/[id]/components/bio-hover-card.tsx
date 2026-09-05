"use client";

import type { ComponentPropsWithRef } from "react";

import { LinkOpenBoldIcon } from "@superdao/icons/bold";
import { cn } from "@superdao/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@superdao/ui/components/hover-card";

export interface WalletBioHoverCardProps extends ComponentPropsWithRef<typeof HoverCardTrigger> {
  /**
   * The supplementary text displayed in the hover-card content.
   */
  description: string;
  /**
   * The title displayed in the hover-card content.
   */
  heading: string;
}

/**
 * Renders a highlighted bio link with a compact contextual preview.
 */
export function WalletBioHoverCard({
  children,
  className,
  description,
  heading,
  href,
  ref,
  ...props
}: WalletBioHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger
        {...props}
        ref={ref}
        href={href}
        delay={10}
        closeDelay={100}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "rounded-sm text-primary transition-colors outline-none hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-ring/40",
          className
        )}
      >
        {children}
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="start"
        sideOffset={8}
        className="w-80 space-y-3 p-4"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <LinkOpenBoldIcon size={16} />
          </span>
          <span className="min-w-0 text-[15px]/5 font-semibold">{heading}</span>
        </div>
        <p className="text-sm/5 text-tabs-foreground">{description}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
