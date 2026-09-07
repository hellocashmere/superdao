"use client";

import type { ComponentPropsWithRef } from "react";
import Image from "next/image";

import { Card } from "@superdao/ui/components/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@superdao/ui/components/table";

import { useGetLabelInsights } from "@/entities/label";

export interface LabelAudienceOverlapTableProps extends ComponentPropsWithRef<typeof Card> {
  label: number;
}

/**
 * Renders NFT collections that overlap with the label audience.
 */
export function LabelAudienceOverlapTable({ className, label, ref, ...props }: LabelAudienceOverlapTableProps) {
  const insightsQuery = useGetLabelInsights(label);

  if (insightsQuery.error) throw insightsQuery.error;
  if (insightsQuery.isPending) return null;

  const collections = insightsQuery.data.audienceOverlap;

  return (
    <Card
      {...props}
      ref={ref}
      data-slot="label-audience-overlap-table"
      className={className}
    >
      <div className="pb-2.5">
        <Table className="min-w-250 [&_tbody_tr]:h-14 [&_td]:h-14 [&_td]:px-5 [&_td]:py-0 [&_td]:text-sm/5 [&_td]:text-[#a2a8b4] [&_td:first-child]:w-12.25 [&_th]:h-13.5 [&_th]:px-5 [&_th]:pt-6 [&_th]:pb-3 [&_th]:text-[13px]/[18px] [&_th]:font-semibold [&_th]:text-[#717a8c] [&_th:first-child]:w-12.25 [&_thead_tr]:hover:bg-transparent">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Collection</TableHead>
              <TableHead className="text-right">Owners in audience</TableHead>
              <TableHead className="text-right">Share in audience</TableHead>
              <TableHead className="text-right">Owners</TableHead>
              <TableHead className="text-right">Floor price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections.map((collection, index) => (
              <TableRow key={`${collection.name}-${index}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-4 font-semibold text-white">
                    <Image
                      src={collection.avatar}
                      alt=""
                      width={28}
                      height={28}
                      className="size-7 rounded-full object-cover"
                    />
                    {collection.name}
                  </span>
                </TableCell>
                <TableCell className="text-right">{collection.ownersInAudience}</TableCell>
                <TableCell className="text-right">{collection.shareInAudience}</TableCell>
                <TableCell className="text-right">{collection.owners}</TableCell>
                <TableCell className="text-right">{collection.floorPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
