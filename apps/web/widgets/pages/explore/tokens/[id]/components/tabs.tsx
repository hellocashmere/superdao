import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { Group16BoldIcon, PollBoldIcon } from "@superdao/icons/bold";
import { cn } from "@superdao/lib/utils";
import { TabsList, TabsTrigger } from "@superdao/ui/components/tabs";

export interface TokenTabsListProps extends ComponentPropsWithRef<typeof TabsList> {
  tokenID: string;
}

/**
 * Renders route navigation between token wallets and insights.
 */
export function TokenTabsList({ className, ref, tokenID, ...props }: TokenTabsListProps) {
  const tokenPath = `/explore/tokens/${encodeURIComponent(tokenID)}`;

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
        render={<Link href={`${tokenPath}/wallets`} />}
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
        render={<Link href={`${tokenPath}/insights`} />}
      >
        <PollBoldIcon className="size-4" />
        Insights
      </TabsTrigger>
    </TabsList>
  );
}
