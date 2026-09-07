import type { ComponentPropsWithRef, ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@superdao/ui/components/card";

export interface WalletIDCardProps extends ComponentPropsWithRef<typeof Card> {
  /**
   * The heading displayed in the card header.
   */
  title: string;
  /**
   * An optional action rendered beside the heading.
   */
  action?: ReactNode;
}

/**
 * Renders a titled card within the wallet details view.
 */
export function WalletIDCard({ action, children, className, ref, title, ...props }: WalletIDCardProps) {
  return (
    <Card
      {...props}
      ref={ref}
      data-slot="wallet-id-card"
      className={className}
    >
      <CardHeader>
        <CardTitle
          role="heading"
          aria-level={2}
          className="flex items-center gap-2"
        >
          {title}
          {action}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-5">{children}</CardContent>
    </Card>
  );
}
