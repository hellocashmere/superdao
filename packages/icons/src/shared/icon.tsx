import type { ComponentPropsWithRef, ReactNode } from "react";

export interface IconProps extends Omit<ComponentPropsWithRef<"svg">, "children" | "height" | "width"> {
	/**
	 * Sets both the icon width and height.
	 *
	 * @default 24
	 */
	size?: number | string;

	/**
	 * Provides an accessible name when the icon conveys meaning by itself.
	 */
	title?: string;
}

export interface IconBaseProps extends IconProps {
	children?: ReactNode;
}

/**
 * Renders the shared accessible SVG frame used by custom product icons.
 */
export function IconBase({ ref, children, size = 24, title, viewBox = "0 0 24 24", ...props }: IconBaseProps) {
	const isLabelled = Boolean(title || props["aria-label"] || props["aria-labelledby"]);
	const ariaHidden = props["aria-hidden"] ?? (isLabelled ? undefined : true);

	return (
		<svg
			{...props}
			ref={ref}
			width={size}
			height={size}
			viewBox={viewBox}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			focusable="false"
			aria-hidden={ariaHidden}
			role={isLabelled ? (props.role ?? "img") : props.role}
		>
			{title ? <title>{title}</title> : null}
			{children}
		</svg>
	);
}
