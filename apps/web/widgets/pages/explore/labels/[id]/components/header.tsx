import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { Group16BoldIcon, PollBoldIcon } from "@superdao/icons/bold";
import { ArrowLeftIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { TabsList, TabsTrigger } from "@superdao/ui/components/tabs";

import { LabelIcon } from "@/entities/label";
import { exploreRoutes } from "@/shared/lib/routes";
import { PageHeader } from "@/shared/ui/page-layout";

export interface LabelIDHeaderProps extends ComponentPropsWithRef<typeof PageHeader> {
  /**
   * Human-readable label name displayed in the page heading.
   */
  title: string;

  /**
   * Accent color used by the label icon.
   */
  color: string;

  /**
   * Backend-provided label ID used by tab navigation.
   */
  labelID: number;

  /**
   * Stable label slug used to select its icon.
   */
  labelSlug: string;

  /**
   * Formatted number of wallets assigned to the label.
   */
  walletCount: string;
}

/**
 * Renders label identity and wallet count.
 */
export function LabelIDHeader({
  className,
  color,
  labelID,
  labelSlug,
  title,
  ref,
  walletCount,
  ...props
}: LabelIDHeaderProps) {
  return (
    <PageHeader
      {...props}
      ref={ref}
      data-slot="label-id-header"
      className={cn("flex min-h-18 items-center justify-between gap-5", className)}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Link
          href={exploreRoutes.labels()}
          aria-label="Back to labels"
          className="-ml-2 flex size-8 shrink-0 items-center justify-center rounded-full text-tabs-foreground outline-none hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <ArrowLeftIcon size={24} />
        </Link>
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}14`, color }}
        >
          <LabelIcon
            labelSlug={labelSlug}
            size={16}
          />
        </span>
        <div className="flex min-w-0 items-end gap-3">
          <h1 className="truncate text-2xl/7 font-bold">{title}</h1>
          <span className="pb-0.5 text-xl/6 font-bold text-tabs-foreground">{walletCount}</span>
        </div>
      </div>
      <TabsList className="h-10 w-75 shrink-0">
        <TabsTrigger
          className="h-8"
          value="wallets"
          nativeButton={false}
          render={<Link href={exploreRoutes.labelWallets(labelID)} />}
        >
          <Group16BoldIcon
            size={16}
            className="text-tabs-foreground"
          />
          Wallets
        </TabsTrigger>
        <TabsTrigger
          className="h-8"
          value="insights"
          nativeButton={false}
          render={<Link href={exploreRoutes.labelInsights(labelID)} />}
        >
          <PollBoldIcon className="size-4" />
          Insights
        </TabsTrigger>
      </TabsList>
    </PageHeader>
  );
}
