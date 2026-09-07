"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

import { useCarousel } from "../context";

export interface CarouselItemProps extends ComponentProps<"div"> {}

/**
 * Renders one accessible carousel slide.
 *
 * @see https://www.embla-carousel.com/get-started/react/
 */
export function CarouselItem({ className, ...props }: CarouselItemProps) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
      {...props}
    />
  );
}
