import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@superdao/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
	"group/button inline-flex shrink-0 items-center justify-center rounded-lg bg-clip-padding font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,opacity,transform] duration-150 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active aria-expanded:bg-primary-active",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active aria-expanded:bg-secondary-active aria-expanded:text-secondary-foreground",
				ghost: "hover:bg-[#D0DCF514] active:bg-[#D0DCF524] aria-expanded:bg-[#D0DCF524]",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive-hover focus-visible:ring-destructive/20 active:bg-destructive-active dark:focus-visible:ring-destructive/40",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default:
					"h-10 gap-2 px-4 text-[15px] leading-6 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-5",
				sm: "h-8 gap-2 px-3 text-sm leading-5 in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-4",
				icon: "size-10 [&_svg:not([class*='size-'])]:size-6",
				"icon-xs": "size-6 rounded-md in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-4",
				"icon-sm": "size-8 in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-4",
				wide: "h-10 gap-2 px-6 text-[15px] leading-6 [&_svg:not([class*='size-'])]:size-5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {
}

/**
 * Renders the button component.
 */
export function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonProps) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(
				buttonVariants({ variant, size }),
				"data-[active=true]:bg-secondary-hover",
				className
			)}
			{...props}
		/>
	);
}
