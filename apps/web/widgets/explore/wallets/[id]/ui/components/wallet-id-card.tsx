"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "@superdao/lib/utils";
import { Card } from "@superdao/ui/components/card";

export interface WalletIDCardProps extends ComponentPropsWithRef<typeof Card> {
  /**
   * The heading displayed in the card header.
   */
  title: string;
  /**
   * An optional action rendered beside the heading.
   */
  action?: ReactNode;
}

/**
 * Renders a titled card within the wallet details view.
 */
export function WalletIDCard({ action, children, className, ref, title, ...props }: WalletIDCardProps) {
  return (
    <Card
      {...props}
      ref={ref}
      data-slot="wallet-id-card"
      className={cn("gap-0 rounded-lg px-5 pt-3 pb-5 ring-0", className)}
    >
      <div className="flex h-5 items-center gap-2">
        <h2 className="text-sm/5 font-semibold text-tabs-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </Card>
  );
}
