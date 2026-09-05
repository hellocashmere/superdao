import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { ArrowLeftIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";

import type { TokenView } from "@/entities/token";
import { PageHeader } from "@/shared/ui/page-layout";

import { TokenTabsList } from "./tabs";

export interface TokenIDHeaderProps extends ComponentPropsWithRef<typeof PageHeader> {
  token: TokenView;
}

/**
 * Renders token identity, audience count, and help action.
 */
export function TokenIDHeader({ className, token, ref, ...props }: TokenIDHeaderProps) {
  return (
    <PageHeader
      {...props}
      ref={ref}
      data-slot="token-id-header"
      className={cn("flex min-h-18 items-center justify-between gap-5", className)}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Link
          href="/explore/tokens"
          aria-label="Back to Tokens"
          className="-ml-2 flex size-8 shrink-0 items-center justify-center rounded-md text-tabs-foreground outline-none hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <ArrowLeftIcon size={24} />
        </Link>
        <Avatar className="size-8 shrink-0">
          <AvatarImage
            src={token.avatar}
            alt=""
          />
        </Avatar>
        <div className="flex min-w-0 items-end gap-3">
          <h1 className="truncate text-2xl/7 font-bold">{token.name}</h1>
          <span className="pb-0.5 text-xl/6 font-bold text-tabs-foreground">{token.walletCount}</span>
        </div>
      </div>
      <TokenTabsList tokenID={token.id} />
    </PageHeader>
  );
}
