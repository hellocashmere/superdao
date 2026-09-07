"use client";

import type { ComponentPropsWithRef, ElementType } from "react";

import { ArrowDownBoldIcon, DocumentBoldIcon, DoneBoldIcon, HelpBoldIcon } from "@superdao/icons/bold";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";
import { Skeleton } from "@superdao/ui/components/skeleton";

import type { WalletTransactionKind } from "@/entities/wallet";
import { useGetWalletTransactions } from "@/entities/wallet";

import { WalletIDCard } from "./card";
import { WalletInfoTooltip } from "./info-tooltip";

export interface WalletTransactionsProps extends Omit<ComponentPropsWithRef<typeof WalletIDCard>, "action" | "title"> {
  /**
   * ID of the wallet whose transactions are rendered.
   */
  walletID: number;
}

const transactionIcons: Record<WalletTransactionKind, ElementType> = {
  approved: DoneBoldIcon,
  contract: DocumentBoldIcon,
  transfer: ArrowDownBoldIcon,
  unknown: HelpBoldIcon,
};

/**
 * Renders the wallet transaction summary and recent transaction rows.
 */
export function WalletTransactions({ className, ref, walletID, ...props }: WalletTransactionsProps) {
  const transactionsQuery = useGetWalletTransactions(walletID);

  if (transactionsQuery.error) throw transactionsQuery.error;
  if (transactionsQuery.isPending) {
    return (
      <WalletIDCard
        {...props}
        ref={ref}
        title="Last 30d transactions"
        data-state="loading"
        className={className}
      >
        <div className="mt-4 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index}>
              <Skeleton className="h-4.5 w-16" />
              <Skeleton className="mt-1 h-5.25 w-24" />
            </div>
          ))}
        </div>
        <div className="mt-5 border-t border-border pt-5">
          <Skeleton className="h-4.5 w-16" />
          <div className="mt-3 space-y-4">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="grid min-h-6 grid-cols-[1.1fr_1.1fr_1.1fr_0.9fr] items-center gap-4"
              >
                {Array.from({ length: 4 }, (_, cellIndex) => (
                  <Skeleton
                    key={cellIndex}
                    className="h-5 w-4/5"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </WalletIDCard>
    );
  }

  const transactionData = transactionsQuery.data;

  return (
    <WalletIDCard
      {...props}
      ref={ref}
      title={transactionData.title}
      data-state="ready"
      className={className}
      action={
        <WalletInfoTooltip
          label={transactionData.tooltip}
          className="ml-1"
        />
      }
    >
      <dl className="mt-4 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {transactionData.metrics.map((metric) => (
          <div
            key={metric.id}
            data-tone={metric.tone}
            className="group/metric"
          >
            <dt className="text-[13px]/[18px] font-semibold text-muted-foreground">{metric.label}</dt>
            <dd className="mt-1 text-[17px]/[21px] font-bold group-data-[tone=negative]/metric:text-destructive group-data-[tone=positive]/metric:text-constructive">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 border-t border-border pt-5">
        <h3 className="text-[13px]/[18px] font-semibold text-muted-foreground">Recent</h3>
        <div className="mt-3 space-y-4">
          {transactionData.transactions.map((transaction) => {
            const Icon = transactionIcons[transaction.kind];

            return (
              <div
                key={transaction.id}
                data-tone={transaction.tone}
                className="group/transaction grid min-h-6 grid-cols-[1.1fr_1.1fr_1.1fr_0.9fr] items-center gap-4 text-sm/5"
              >
                <span className="flex items-center gap-3">
                  <span
                    data-direction={transaction.direction}
                    className="group/transaction-icon flex size-6 items-center justify-center rounded-full bg-accent text-tabs-foreground"
                  >
                    <Icon
                      size={16}
                      className="transition-transform group-data-[direction=up]/transaction-icon:rotate-180"
                    />
                  </span>
                  {transaction.type}
                </span>
                <span className="text-muted-foreground group-data-[tone=negative]/transaction:text-destructive group-data-[tone=positive]/transaction:text-constructive">
                  {transaction.amount}
                </span>
                <span className="flex items-center gap-2">
                  {transaction.assetIcon ? (
                    <Avatar className="data-[size=m]:size-5">
                      <AvatarImage
                        src={transaction.assetIcon}
                        alt=""
                      />
                    </Avatar>
                  ) : null}
                  <span className="truncate">{transaction.asset}</span>
                </span>
                <span>{transaction.date}</span>
              </div>
            );
          })}
        </div>
      </div>
    </WalletIDCard>
  );
}
