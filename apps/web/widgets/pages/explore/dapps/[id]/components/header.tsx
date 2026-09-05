"use client";

import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { ArrowLeftIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";

import type { DappView } from "@/entities/dapp";
import { PageHeader } from "@/shared/ui/page-layout";

import { DappTabsList } from "./tabs";

export interface DappIDHeaderProps extends ComponentPropsWithRef<typeof PageHeader> {
  dapp: DappView;
}

/**
 * Renders dapp identity, audience count, and help action.
 */
export function DappIDHeader({ className, dapp, ref, ...props }: DappIDHeaderProps) {
  return (
    <PageHeader
      {...props}
      ref={ref}
      data-slot="dapp-id-header"
      className={cn("flex min-h-18 items-center justify-between gap-5", className)}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Link
          href="/explore/dapps"
          aria-label="Back to Dapps"
          className="-ml-2 flex size-8 shrink-0 items-center justify-center rounded-md text-tabs-foreground outline-none hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <ArrowLeftIcon size={24} />
        </Link>
        <Avatar className="size-8 shrink-0">
          <AvatarImage
            src={dapp.avatar}
            alt=""
          />
        </Avatar>
        <div className="flex min-w-0 items-end gap-3">
          <h1 className="truncate text-2xl/7 font-bold">{dapp.name}</h1>
          <span className="pb-0.5 text-xl/6 font-bold text-tabs-foreground">{dapp.walletCount}</span>
        </div>
      </div>
      <DappTabsList dappID={dapp.id} />
    </PageHeader>
  );
}
