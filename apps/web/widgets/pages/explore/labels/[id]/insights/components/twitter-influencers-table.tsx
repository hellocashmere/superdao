"use client";

import type { ComponentPropsWithRef } from "react";
import Image from "next/image";

import { Card } from "@superdao/ui/components/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@superdao/ui/components/table";

import { useGetLabelInsights } from "@/entities/label";

export interface LabelTwitterInfluencersTableProps extends ComponentPropsWithRef<typeof Card> {
  label: number;
}

/**
 * Renders Twitter profiles found in the label audience.
 */
export function LabelTwitterInfluencersTable({ className, label, ref, ...props }: LabelTwitterInfluencersTableProps) {
  const insightsQuery = useGetLabelInsights(label);

  if (insightsQuery.error) throw insightsQuery.error;
  if (insightsQuery.isPending) return null;

  const influencers = insightsQuery.data.twitterInfluencers;

  return (
    <Card
      {...props}
      ref={ref}
      data-slot="label-twitter-influencers-table"
      className={className}
    >
      <h3 className="px-5 pt-3 text-sm/5 font-medium text-tabs-foreground">Twitter influencers</h3>
      <div className="pb-2.5">
        <Table className="min-w-175 [&_tbody_tr]:h-14 [&_td]:h-14 [&_td]:px-5 [&_td]:py-0 [&_td]:text-sm/5 [&_th]:h-13.5 [&_th]:px-5 [&_th]:pt-6 [&_th]:pb-3 [&_th]:text-[13px]/[18px] [&_th]:font-semibold [&_th]:text-[#717a8c] [&_thead_tr]:hover:bg-transparent">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="text-right">Followers</TableHead>
              <TableHead className="text-right">NFTs</TableHead>
              <TableHead className="text-right">Balance, USD</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {influencers.map((item) => (
              <TableRow key={item.username}>
                <TableCell>
                  <span className="flex items-center gap-4 font-semibold">
                    <Image
                      src={item.avatar}
                      alt=""
                      width={28}
                      height={28}
                      className="size-7 rounded-full object-cover"
                    />
                    {item.name}
                  </span>
                </TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell className="text-right">{item.followers}</TableCell>
                <TableCell className="text-right">{item.nfts}</TableCell>
                <TableCell className="text-right">{item.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
