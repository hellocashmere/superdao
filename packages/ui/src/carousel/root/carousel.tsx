"use client";

import type { ComponentProps, KeyboardEvent } from "react";
import { useCallback, useEffect, useSyncExternalStore } from "react";

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
	const subscribe = useCallback(
		(onStoreChange: () => void) => {
			if (!api) return () => {};

			api.on("reInit", onStoreChange);
			api.on("select", onStoreChange);

			return () => {
				api.off("reInit", onStoreChange);
				api.off("select", onStoreChange);
			};
		},
		[api]
	);

	const canScrollPrev = useSyncExternalStore(
		subscribe,
		() => api?.canScrollPrev() ?? false,
		() => false
	);

	const canScrollNext = useSyncExternalStore(
		subscribe,
		() => api?.canScrollNext() ?? false,
		() => false
	);

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
