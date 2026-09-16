"use client";

import type { ComponentPropsWithRef } from "react";
import { useState } from "react";

import { cn } from "@superdao/lib/utils";

import { useSessionStore } from "@/entities/session";
import { initialUsers } from "@/entities/user";
import type { AuthProvider } from "@/shared/ui/auth-button";
import { AuthButton } from "@/shared/ui/auth-button";

const authProviders: readonly AuthProvider[] = ["metamask", "walletconnect", "ton"];

export interface AuthActionsProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders wallet sign-in actions and persists the resulting session.
 */
export function AuthActions({ ref, className, ...props }: AuthActionsProps) {
	const authenticate = useSessionStore((state) => state.authenticate);
	const [pendingProvider, setPendingProvider] = useState<AuthProvider | null>(null);

	/**
	 * Starts a session with the selected wallet provider.
	 */
	async function connectWallet(provider: AuthProvider) {
		setPendingProvider(provider);
		await new Promise((resolve) => window.setTimeout(resolve, 650));
		authenticate(provider, initialUsers[0]!.id);
	}

	return (
		<div
			ref={ref}
			data-slot="auth-actions"
			className={cn("flex w-full flex-col gap-4", className)}
			{...props}
		>
			{authProviders.map((provider) => (
				<AuthButton
					key={provider}
					provider={provider}
					loading={pendingProvider === provider}
					disabled={pendingProvider !== null}
					onClick={() => void connectWallet(provider)}
				/>
			))}
		</div>
	);
}
