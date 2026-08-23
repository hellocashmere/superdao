"use client"

import type useEmblaCarousel from "embla-carousel-react"
import type { UseEmblaCarouselType } from "embla-carousel-react"
import { createContext, useContext } from "react"

export type CarouselApi = UseEmblaCarouselType[1]
export type CarouselOptions = Parameters<typeof useEmblaCarousel>[0]
export type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1]

export interface CarouselContextProps {
  /**
   * Ref callback that connects Embla to the carousel viewport.
   */
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  /**
   * Active Embla carousel API instance.
   */
  api: CarouselApi
  /**
   * Embla configuration used by the carousel.
   */
  opts?: CarouselOptions
  /**
   * Axis used to lay out slides and navigation controls.
   */
  orientation: "horizontal" | "vertical"
  /**
   * Scrolls to the previous slide when available.
   */
  scrollPrev: () => void
  /**
   * Scrolls to the next slide when available.
   */
  scrollNext: () => void
  /**
   * Indicates whether the carousel can scroll backward.
   */
  canScrollPrev: boolean
  /**
   * Indicates whether the carousel can scroll forward.
   */
  canScrollNext: boolean
}

export const CarouselContext = createContext<CarouselContextProps | null>(null)

/**
 * Reads the active carousel state and actions.
 */
export function useCarousel(): CarouselContextProps {
  const context = useContext(CarouselContext)
  if (!context)
    throw new Error("useCarousel must be used within a <Carousel />")
  return context
}
