import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { cn } from "@superdao/lib/utils";

import type { LabelPreviewView } from "@/entities/label";
import { LabelIcon } from "@/entities/label";
import { exploreRoutes } from "@/shared/lib/routes";

export interface LabelCardProps extends Omit<ComponentPropsWithRef<"a">, "id" | "title"> {
  /**
   * Label preview rendered by the directory link.
   */
  label: LabelPreviewView;
}

/**
 * Renders a link to a label with its icon and wallet count.
 */
export function LabelCard({ ref, className, label, ...props }: LabelCardProps) {
  return (
    <Link
      {...props}
      ref={ref}
      href={exploreRoutes.labelWallets(label.id)}
      data-slot="label-card"
      className={cn(
        "flex h-16 items-center gap-4 rounded-lg outline-none hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
    >
      <span
        className="flex size-16 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${label.color}14` }}
      >
        <LabelIcon
          labelSlug={label.slug}
          className="size-8"
          style={{ color: label.color }}
        />
      </span>
      <span data-slot="label-card-content">
        <span className="block text-[17px]/[21px] font-bold">{label.name}</span>
        <span className="mt-1 block text-sm/5 text-tabs-foreground">{label.walletCount}</span>
      </span>
    </Link>
  );
}
