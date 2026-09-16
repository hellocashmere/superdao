import type { ComponentPropsWithRef } from "react";
import Image from "next/image";

import { cn } from "@superdao/lib/utils";

export type AuthProvider = "metamask" | "ton" | "walletconnect";

const providerDetails = {
	metamask: {
		icon: "/auth/metamask.svg",
		label: "Metamask",
	},
	ton: {
		icon: "/auth/ton.svg",
		label: "TON",
	},
	walletconnect: {
		icon: "/auth/walletconnect.svg",
		label: "WalletConnect",
	},
} as const satisfies Record<AuthProvider, { icon: string; label: string }>;

export interface AuthButtonProps extends ComponentPropsWithRef<"button"> {
	/**
	 * Whether authentication is in progress and the button is disabled.
	 */
	loading?: boolean;

	/**
	 * Wallet provider whose branding and icon are displayed.
	 */
	provider: AuthProvider;
}

/**
 * Renders a wallet authentication button with provider-specific styling.
 */
export function AuthButton({
	ref,
	children,
	className,
	disabled,
	loading = false,
	provider,
	type = "button",
	...props
}: AuthButtonProps) {
	const details = providerDetails[provider];

	return (
		<button
			ref={ref}
			type={type}
			disabled={disabled || loading}
			aria-busy={loading}
			data-slot="auth-button"
			data-provider={provider}
			className={cn(
				"relative flex h-10 w-full items-center justify-center gap-2 rounded-lg px-5 text-sm/5 font-semibold text-white transition-[background-color,opacity,transform] duration-150 outline-none select-none focus-visible:ring-3 focus-visible:ring-white/30 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 data-[provider=metamask]:bg-[#fc7900]/15 data-[provider=metamask]:hover:bg-[#fc7900]/20 data-[provider=metamask]:active:bg-[#fc7900]/12 data-[provider=ton]:bg-[#0098ea]/15 data-[provider=ton]:hover:bg-[#0098ea]/20 data-[provider=ton]:active:bg-[#0098ea]/12 data-[provider=walletconnect]:bg-[#398fe5]/15 data-[provider=walletconnect]:hover:bg-[#398fe5]/20 data-[provider=walletconnect]:active:bg-[#398fe5]/12",
				className
			)}
			{...props}
		>
			<span
				data-provider={provider}
				className="relative size-6 shrink-0 overflow-hidden data-[provider=ton]:rounded-full"
				aria-hidden="true"
			>
				<Image
					src={details.icon}
					alt=""
					width={provider === "ton" ? 64 : 24}
					height={24}
					className="h-6 max-w-none object-left"
				/>
			</span>
			<span className="data-[state=loading]:opacity-0">{children ?? details.label}</span>
		</button>
	);
}
