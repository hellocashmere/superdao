"use client";

import type { ComponentPropsWithRef } from "react";
import Image from "next/image";

import { InfoSmallIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@superdao/ui/components/card";
import type { ChartConfig } from "@superdao/ui/components/chart";
import { ChartContainer, ChartPrimitive } from "@superdao/ui/components/chart";
import { Skeleton } from "@superdao/ui/components/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@superdao/ui/components/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@superdao/ui/components/tooltip";

import type { TokenChartDatumView } from "@/entities/token";
import { useGetTokenInsights } from "@/entities/token";

const tokenInsightChartConfig = {
  value: {
    label: "Wallets",
    color: "#32d74b",
  },
} satisfies ChartConfig;

const WALLET_BALANCE_COLOR = "#32D74B";
const DEFAULT_CHART_COLOR = "#36BED9";

export interface TokenInsightBarChartProps extends ComponentPropsWithRef<typeof Card> {
  data: readonly TokenChartDatumView[];
  description?: string;
  title: string;
  tone?: "cyan" | "green" | "multi";
}

/**
 * Renders a vertical distribution chart for token insights.
 */
export function TokenInsightBarChart({
  className,
  data,
  description,
  ref,
  title,
  tone = "green",
  ...props
}: TokenInsightBarChartProps) {
  const maxValue = Math.max(...data.map(({ value }) => value), 1);
  const chartColor = tone === "green" ? WALLET_BALANCE_COLOR : DEFAULT_CHART_COLOR;

  return (
    <Card
      {...props}
      ref={ref}
      data-tone={tone}
      className={cn("h-74", className)}
    >
      <CardHeader>
        <CardTitle
          role="heading"
          aria-level={3}
        >
          {title}
        </CardTitle>
        {description ? <CardDescription className="text-icon">{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 pb-3">
        <ChartContainer
          config={tokenInsightChartConfig}
          className="mt-1 aspect-auto min-h-0 w-full flex-1"
        >
          <ChartPrimitive.BarChart
            data={data}
            margin={{ top: 24, right: 0, bottom: 0, left: 0 }}
            barCategoryGap={13}
          >
            <ChartPrimitive.XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              interval={0}
              tick={{ fill: "#a2a8b4", fontSize: 11 }}
            />
            <ChartPrimitive.YAxis
              hide
              domain={[0, maxValue]}
            />
            <ChartPrimitive.Bar
              dataKey="value"
              radius={[4, 4, 4, 4]}
            >
              {data.map((item) => (
                <ChartPrimitive.Cell
                  key={item.label}
                  fill={tone === "multi" ? (item.fill ?? chartColor) : chartColor}
                />
              ))}
              <ChartPrimitive.LabelList
                dataKey="displayValue"
                position="top"
                fill="#ffffff"
                fontSize={13}
              />
            </ChartPrimitive.Bar>
          </ChartPrimitive.BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export interface TokenInsightsProps extends ComponentPropsWithRef<"div"> {
  tokenID: string;
}

/**
 * Renders the complete analytics view for a token audience.
 */
export function TokenInsights({ className, tokenID, ref, ...props }: TokenInsightsProps) {
  const insightsQuery = useGetTokenInsights(tokenID);

  if (insightsQuery.error) throw insightsQuery.error;
  if (insightsQuery.isPending)
    return (
      <Skeleton
        ref={ref}
        className={cn("h-[900px] w-full rounded-lg", className)}
        {...props}
      />
    );

  const insights = insightsQuery.data;
  const charts = [
    ["Wallet balance, USD", "Based on ETH, USDT, USDC, DAI", insights.walletBalance, "green"],
    ["NFT allocation", "NFTs per wallet", insights.nftAllocation, "cyan"],
    ["Superrank", "", insights.superrank, "multi"],
    ["Interests", "", insights.interests, "cyan"],
    ["Personas", "", insights.personas, "cyan"],
  ] as const;

  return (
    <div
      ref={ref}
      data-slot="token-insights"
      className={cn("space-y-6", className)}
      {...props}
    >
      <section>
        <h2 className="mb-4 text-xl/6 font-bold">Balances and transactions</h2>
        <div className="grid gap-5 xl:grid-cols-4">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
            {insights.balanceMetrics.map((metric) => (
              <Card
                key={metric.title}
                className="min-h-34"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {metric.title}
                    {metric.info ? (
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <button
                              type="button"
                              className="inline-flex size-4 cursor-help items-center justify-center rounded-sm text-icon outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                              aria-label={`About ${metric.title}`}
                            />
                          }
                        >
                          <InfoSmallIcon size={16} />
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          sideOffset={8}
                          className="max-w-64 font-normal"
                        >
                          {metric.info}
                        </TooltipContent>
                      </Tooltip>
                    ) : null}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-1">
                  <p className="text-2xl/7 font-bold">{metric.value}</p>
                  <CardDescription>{metric.description}</CardDescription>
                </CardContent>
                <CardFooter className="text-[13px]/[18px] text-muted-foreground">{metric.footer}</CardFooter>
              </Card>
            ))}
          </div>
          {charts.slice(0, 2).map(([title, description, values, tone]) => (
            <TokenInsightBarChart
              key={title}
              className="last:xl:col-span-2"
              title={title}
              description={description}
              data={values}
              tone={tone}
            />
          ))}
        </div>
        <Card className="mt-5 min-h-29">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Last 30d transactions
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      className="inline-flex size-4 cursor-help items-center justify-center rounded-sm text-icon outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                      aria-label="About last 30 day transactions"
                    />
                  }
                >
                  <InfoSmallIcon size={16} />
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={8}
                  className="max-w-64 font-normal"
                >
                  Aggregated onchain transactions completed by audience wallets during the last 30 days.
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4 grid gap-4 pb-3 sm:grid-cols-2 xl:grid-cols-4">
            {insights.transactionStats.map((stat) => (
              <div key={stat.label}>
                <p
                  data-tone={stat.tone}
                  className="text-xl/6 font-bold data-[tone=negative]:text-[#ff5471] data-[tone=positive]:text-[#32d74b]"
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-[15px]/6 font-semibold text-tabs-foreground">{stat.label}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
      <section>
        <h2 className="mb-4 text-xl/6 font-bold">Contacts</h2>
        <div className="grid gap-5 xl:grid-cols-[245px_1fr]">
          <div className="space-y-5">
            {insights.contactMetrics.map((metric) => (
              <Card
                key={metric.title}
                className="min-h-34"
              >
                <CardHeader>
                  <CardTitle>{metric.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-1">
                  <p className="text-2xl/7 font-bold">{metric.value}</p>
                  <CardDescription>{metric.description}</CardDescription>
                </CardContent>
                <CardFooter className="text-[13px]/[18px] text-muted-foreground">{metric.footer}</CardFooter>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle
                role="heading"
                aria-level={3}
              >
                Twitter influencers
              </CardTitle>
            </CardHeader>
            <div className="pb-2.5">
              <Table className="min-w-[700px] [&_tbody_tr]:h-14 [&_tbody_tr]:hover:bg-[#303744] [&_td]:h-14 [&_td]:px-5 [&_td]:py-0 [&_td]:text-sm/5 [&_th]:h-[54px] [&_th]:px-5 [&_th]:pt-6 [&_th]:pb-3 [&_th]:text-[13px]/[18px] [&_th]:font-semibold [&_th]:text-[#717a8c] [&_thead_tr]:hover:bg-transparent">
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
                  {insights.influencers.map((item) => (
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
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-xl/6 font-bold">Wallet profile</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          {charts.slice(2).map(([title, , values, tone]) => (
            <TokenInsightBarChart
              key={title}
              className="last:lg:col-span-2"
              title={title}
              data={values}
              tone={tone}
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-xl/6 font-bold">Audience overlap</h2>
        <Card>
          <div className="pb-2.5">
            <Table className="min-w-[1000px] [&_tbody_tr]:h-14 [&_tbody_tr]:hover:bg-[#303744] [&_td]:h-14 [&_td]:px-5 [&_td]:py-0 [&_td]:text-sm/5 [&_td]:text-[#a2a8b4] [&_td:first-child]:w-[49px] [&_th]:h-[54px] [&_th]:px-5 [&_th]:pt-6 [&_th]:pb-3 [&_th]:text-[13px]/[18px] [&_th]:font-semibold [&_th]:text-[#717a8c] [&_th:first-child]:w-[49px] [&_thead_tr]:hover:bg-transparent">
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead className="text-right">Owners in audience</TableHead>
                  <TableHead className="text-right">Share in audience</TableHead>
                  <TableHead className="text-right">Owners</TableHead>
                  <TableHead className="text-right">Floor price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {insights.overlap.map((item, index) => (
                  <TableRow key={`${item.name}-${index}`}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-4 font-semibold text-white">
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
                    <TableCell className="text-right">{item.ownersInAudience}</TableCell>
                    <TableCell className="text-right">{item.shareInAudience}</TableCell>
                    <TableCell className="text-right">{item.owners}</TableCell>
                    <TableCell className="text-right">{item.floorPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>
    </div>
  );
}
