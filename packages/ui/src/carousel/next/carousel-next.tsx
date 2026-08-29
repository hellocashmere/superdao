"use client";

import { cn } from "@superdao/lib/utils";
import { ChevronRightIcon } from "lucide-react";

import type { ButtonProps } from "../../button/button/button";
import { Button } from "../../button/button/button";
import { useCarousel } from "../context";

export interface CarouselNextProps extends ButtonProps {}

/**
 * Moves the carousel to its next slide.
 *
 * @see https://www.embla-carousel.com/get-started/react/
 */
export function CarouselNext({ className, variant = "secondary", size = "icon-sm", ...props }: CarouselNextProps) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      data-orientation={orientation}
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation rounded-full data-[orientation=horizontal]:inset-y-0 data-[orientation=horizontal]:-right-12 data-[orientation=horizontal]:my-auto data-[orientation=vertical]:-bottom-12 data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRightIcon aria-hidden="true" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}
