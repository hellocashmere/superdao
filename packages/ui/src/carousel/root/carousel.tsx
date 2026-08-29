"use client";

import type { ComponentProps, KeyboardEvent } from "react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@superdao/lib/utils";
import useEmblaCarousel from "embla-carousel-react";

import type { CarouselApi, CarouselOptions, CarouselPlugin } from "../context";
import { CarouselContext } from "../context";

export interface CarouselProps extends ComponentProps<"div"> {
  /**
   * Embla carousel configuration.
   */
  opts?: CarouselOptions;

  /**
   * Embla plugins applied to the carousel.
   */
  plugins?: CarouselPlugin;

  /**
   * Determines the slide axis and navigation placement.
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Receives the initialized Embla API.
   */
  setApi?: (api: CarouselApi) => void;
}

/**
 * Provides accessible Embla carousel behavior and state.
 *
 * Composition:
 * ```text
 * Carousel
 * ├── CarouselContent
 * ├── CarouselItem
 * ├── CarouselNext
 * └── CarouselPrevious
 * ```
 *
 * @see https://www.embla-carousel.com/get-started/react/
 */
export function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" }, plugins);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((currentApi: CarouselApi) => {
    if (!currentApi) return;
    setCanScrollPrev(currentApi.canScrollPrev());
    setCanScrollNext(currentApi.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollNext, scrollPrev]
  );

  useEffect(() => {
    if (api && setApi) setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;
    // Embla exposes its initial selection only after the API is initialized.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef: carouselRef,
        api: api,
        opts: opts,
        orientation: orientation,
        scrollPrev: scrollPrev,
        scrollNext: scrollNext,
        canScrollPrev: canScrollPrev,
        canScrollNext: canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}
