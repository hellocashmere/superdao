"use client"

import { cn } from "@superdao/ui/lib/utils"
import { ChevronLeftIcon } from "lucide-react"

import type { ButtonProps } from "../../button/button/button"
import { Button } from "../../button/button/button"
import { useCarousel } from "../context"

export interface CarouselPreviousProps extends ButtonProps {}

/**
 * Moves the carousel to its previous slide.
 *
 * @see https://www.embla-carousel.com/get-started/react/
 */
export function CarouselPrevious({
  className,
  variant = "secondary",
  size = "icon-sm",
  ...props
}: CarouselPreviousProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "inset-y-0 -left-12 my-auto"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeftIcon aria-hidden="true" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}
