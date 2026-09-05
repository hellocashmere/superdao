import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { Group16BoldIcon, PollBoldIcon } from "@superdao/icons/bold";
import { cn } from "@superdao/lib/utils";
import { TabsList, TabsTrigger } from "@superdao/ui/components/tabs";

export interface DappTabsListProps extends ComponentPropsWithRef<typeof TabsList> {
  dappID: string;
}

/**
 * Renders route navigation between dapp wallets and insights.
 */
export function DappTabsList({ className, dappID, ref, ...props }: DappTabsListProps) {
  const dappPath = `/explore/dapps/${encodeURIComponent(dappID)}`;

  return (
    <TabsList
      ref={ref}
      className={cn("h-10 w-[300px] shrink-0 gap-1 rounded-lg p-1", className)}
      {...props}
    >
      <TabsTrigger
        className="h-8 rounded-[4px] px-3 py-1"
        value="wallets"
        nativeButton={false}
        render={<Link href={`${dappPath}/wallets`} />}
      >
        <Group16BoldIcon
          size={16}
          className="text-tabs-foreground"
        />
        Wallets
      </TabsTrigger>
      <TabsTrigger
        className="h-8 rounded-[4px] px-3 py-1"
        value="insights"
        nativeButton={false}
        render={<Link href={`${dappPath}/insights`} />}
      >
        <PollBoldIcon className="size-4" />
        Insights
      </TabsTrigger>
    </TabsList>
  );
}
