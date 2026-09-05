"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import { InfoIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@superdao/ui/components/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@superdao/ui/components/tooltip";

export interface MetricCardProps extends ComponentPropsWithRef<typeof Card> {
  /**
   * TODO: add docs
   */
  title: string;

  /**
   * TODO: add docs
   */
  description: string;

  /**
   * TODO: add docs
   */
  value: string;

  /**
   * TODO: add docs
   */
  footerValue: string;

  /**
   * TODO: add docs
   */
  footerLabel?: string;

  /**
   * TODO: add docs
   */
  icon?: ReactNode;

  /**
   * TODO: add docs
   */
  tooltip?: string;
}

/**
 * Renders a presentation-only summary metric card.
 */
export function MetricCard({
  ref,
  className,
  description,
  footerLabel,
  footerValue,
  icon,
  title,
  tooltip,
  value,
  ...props
}: MetricCardProps) {
  return (
    <Card
      {...props}
      ref={ref}
      data-slot="metric-card"
      className={cn("min-h-34", className)}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
          {tooltip ? (
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    className="inline-flex size-4 cursor-help items-center justify-center rounded-sm text-icon outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                    aria-label={`About ${title}`}
                  />
                }
              >
                <InfoIcon size={16} />
              </TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={8}
                className="max-w-64 font-normal"
              >
                {tooltip}
              </TooltipContent>
            </Tooltip>
          ) : null}
        </CardTitle>
        {icon ? <CardAction className="flex text-icon">{icon}</CardAction> : null}
      </CardHeader>
      <CardContent className="pt-1">
        <p className="text-2xl/7 font-bold">{value}</p>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="gap-1 pb-3 text-[13px]/[18px] text-muted-foreground">
        <span className="font-semibold">{footerValue}</span>
        {footerLabel}
      </CardFooter>
    </Card>
  );
}
