"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@superdao/ui/components/tooltip";

export interface TokenWalletEmptyValueProps extends ComponentPropsWithRef<"span"> {
  message: string;
}

/**
 * Renders an empty table value with contextual information on hover.
 */
export function TokenWalletEmptyValue({ className, message, ref, ...props }: TokenWalletEmptyValueProps) {
  return (
    <span
      {...props}
      ref={ref}
      data-slot="token-wallet-empty-value"
      className={cn("inline-flex text-[#717a8c]", className)}
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              aria-label={message}
            />
          }
        >
          –
        </TooltipTrigger>
        <TooltipContent>{message}</TooltipContent>
      </Tooltip>
    </span>
  );
}
