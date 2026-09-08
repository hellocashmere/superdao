"use client";

import { cn } from "@superdao/lib/utils";
import { ChevronRightIcon } from "lucide-react";

import type { ButtonProps } from "../../button";
import { Button } from "../../button";
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
			variant={variant}
			size={size}
			className={cn(
				"absolute touch-manipulation rounded-full",
				orientation === "horizontal" ? "inset-y-0 -right-12 my-auto" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
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
