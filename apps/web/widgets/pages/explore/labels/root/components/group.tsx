import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import type { LabelPreviewView } from "@/entities/label";

import { LabelCard } from "./card";

export interface LabelGroupProps extends ComponentPropsWithRef<"section"> {
  /**
   * Heading displayed above the label cards.
   */
  title: string;

  /**
   * Labels included in this directory group.
   */
  items: readonly LabelPreviewView[];
}

/**
 * Renders a titled responsive group of label cards.
 */
export function LabelGroup({ className, items, ref, title, ...props }: LabelGroupProps) {
  return (
    <section
      ref={ref}
      data-slot="label-group"
      className={cn("mb-10", className)}
      {...props}
    >
      <h2 className="text-[17px]/[21px] font-bold">{title}</h2>
      <div className="mt-5 grid gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((label) => (
          <LabelCard
            key={label.id}
            label={label}
          />
        ))}
      </div>
    </section>
  );
}
