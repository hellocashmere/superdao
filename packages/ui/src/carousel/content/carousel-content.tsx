"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

import { useCarousel } from "../context";

export interface CarouselContentProps extends ComponentProps<"div"> {}

/**
 * Contains and clips the carousel slide track.
 *
 * @see https://www.embla-carousel.com/get-started/react/
 */
export function CarouselContent({ className, ...props }: CarouselContentProps) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        data-orientation={orientation}
        className={cn(
          "flex data-[orientation=horizontal]:-ml-4 data-[orientation=vertical]:-mt-4 data-[orientation=vertical]:flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
}
