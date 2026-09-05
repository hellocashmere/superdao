import type { ComponentPropsWithRef, ReactNode } from "react";
import Image from "next/image";

import { cn } from "@superdao/lib/utils";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@superdao/ui/components/empty";

const error404 = "/illustrations/c9576742e35aa5a678f0d842094b76de.svg";
const error500 = "/illustrations/692487cadf06a1a3224c17442eddc521.svg";

export type ErrorVariant = "not-found" | "server-error" | "unknown-error" | "maintenance";

export interface ErrorProps extends ComponentPropsWithRef<"section"> {
  /**
   * TODO: add docs
   */
  action?: ReactNode;
  /**
   * TODO: add docs
   */
  variant: ErrorVariant;
}

const errorContent: Record<
  ErrorVariant,
  {
    description: ReactNode;
    title: string;
  }
> = {
  "not-found": {
    title: "Page not found",
    description: (
      <>
        You may have used a broken URL
        <br />
        or the page has been removed
      </>
    ),
  },
  "server-error": {
    title: "Something went wrong on the server",
    description: (
      <>
        We are aware of the problem and working to fix it.
        <br />
        Try reloading the page or come back later
      </>
    ),
  },
  "unknown-error": {
    title: "Something went wrong",
    description: (
      <>
        An unexpected error occurred.
        <br />
        Please try again later
      </>
    ),
  },
  maintenance: {
    title: "We'll be back soon",
    description: (
      <>
        Superdao is temporarily unavailable.
        <br />
        Please check back later
      </>
    ),
  },
};

/**
 * Renders a reusable fallback state for missing, unavailable, or failed pages.
 */
export function Error({ action, className, ref, variant, ...props }: ErrorProps) {
  const content = errorContent[variant];

  return (
    <section
      ref={ref}
      data-slot="error"
      data-variant={variant}
      className={cn(
        "flex min-h-0 flex-1 items-center justify-center bg-background px-6 py-16 text-foreground",
        className
      )}
      {...props}
    >
      <Empty className="max-w-140 gap-0 border-0 p-0">
        <EmptyMedia className="mb-4 size-50">
          <Image
            src={variant === "not-found" ? error404 : error500}
            alt="image"
            width={variant === "not-found" ? 200 : 125}
            height={variant === "not-found" ? 200 : 171}
            priority
          />
        </EmptyMedia>
        <EmptyHeader className="max-w-none gap-0">
          <EmptyTitle className="font-heading text-2xl/7 font-bold">{content.title}</EmptyTitle>
          <EmptyDescription className="mt-2 text-[15px]/6 text-muted-foreground">
            {content.description}
          </EmptyDescription>
        </EmptyHeader>
        {action ? <EmptyContent className="mt-8 max-w-none">{action}</EmptyContent> : null}
      </Empty>
    </section>
  );
}
