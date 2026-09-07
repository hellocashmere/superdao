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
   * Heading that identifies the metric.
   */
  title: string;

  /**
   * Supporting context displayed below the primary value.
   */
  description: string;

  /**
   * Primary formatted value of the metric.
   */
  value: string;

  /**
   * Formatted secondary value displayed in the card footer.
   *
   * When `footerLabel` is omitted, the first space-delimited segment is emphasized and the remaining text is used as
   * the label.
   */
  footerValue: string;

  /**
   * Explicit label displayed after the footer value.
   *
   * When omitted, the label is inferred from `footerValue`.
   */
  footerLabel?: string;

  /**
   * Optional visual rendered in the card header action area.
   */
  icon?: ReactNode;

  /**
   * Explanatory text shown from an information tooltip beside the title.
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
  const [inferredFooterValue, ...inferredFooterLabelParts] = footerValue.split(" ");
  const resolvedFooterValue = footerLabel === undefined ? inferredFooterValue : footerValue;
  const resolvedFooterLabel = footerLabel ?? inferredFooterLabelParts.join(" ");

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
      <CardContent className="space-y-1 pt-1">
        <p className="text-2xl/7 font-bold">{value}</p>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="gap-1 pb-3 text-[13px]/[18px] text-muted-foreground">
        <span className="font-semibold">{resolvedFooterValue}</span>
        {resolvedFooterLabel}
      </CardFooter>
    </Card>
  );
}
