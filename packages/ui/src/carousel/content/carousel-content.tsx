"use client"

import { cn } from "@superdao/ui/lib/utils"
import type { ComponentProps } from "react"

import { useCarousel } from "../context"

export interface CarouselContentProps extends ComponentProps<"div"> {}

/**
 * Contains and clips the carousel slide track.
 *
 * @see https://www.embla-carousel.com/get-started/react/
 */
export function CarouselContent({ className, ...props }: CarouselContentProps) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}
