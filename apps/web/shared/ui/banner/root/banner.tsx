"use client";

import type { ComponentPropsWithRef } from "react";
import { useEffect, useState } from "react";

import { CloseIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";

export interface BannerProps extends ComponentPropsWithRef<"aside"> {
  /**
   * TODO: add docs
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * TODO: add docs
   */
  open?: boolean;

  /**
   * TODO: add docs
   */
  showCloseButton?: boolean;
}

/**
 * Renders the animated banner container and manages its dismissal state.
 *
 * Composition:
 * ```text
 * Banner
 * ├── BannerIcon
 * ├── BannerTitle
 * │   └── BannerDescription
 * └── BannerActions
 * ```
 */
export function Banner({
  children,
  className,
  onOpenChange,
  open,
  ref,
  role = "region",
  showCloseButton = true,
  ...props
}: BannerProps) {
  const [internalOpen, setInternalOpen] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : internalOpen;
  const isVisible = resolvedOpen && hasEntered;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHasEntered(resolvedOpen);
    });

    return () => cancelAnimationFrame(frame);
  }, [resolvedOpen]);

  function dismissBanner() {
    if (!isControlled) {
      setInternalOpen(false);
    }

    onOpenChange?.(false);
  }

  return (
    <aside
      ref={ref}
      role={role}
      inert={!isVisible}
      aria-hidden={!isVisible}
      data-slot="banner"
      data-state={isVisible ? "open" : "closed"}
      data-show-close-button={showCloseButton ? "true" : "false"}
      className={cn(
        "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-50 mx-auto flex w-auto items-center gap-4 rounded-lg bg-card px-5 py-3 text-card-foreground shadow-2xl shadow-black/20 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:pointer-events-none data-[state=closed]:translate-y-[calc(100%+1.5rem)] data-[state=closed]:opacity-0 data-[state=open]:translate-y-0 data-[state=open]:opacity-100 motion-reduce:transition-none sm:right-6 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:left-6 sm:max-w-190",
        "max-sm:flex-wrap max-sm:items-start",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Dismiss notification"
          data-slot="banner-close"
          className="shrink-0 text-muted-foreground hover:text-foreground"
          onClick={dismissBanner}
        >
          <CloseIcon />
        </Button>
      ) : null}
    </aside>
  );
}
