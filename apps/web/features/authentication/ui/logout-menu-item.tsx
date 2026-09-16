"use client";

import type { ComponentPropsWithRef } from "react";
import { useRouter } from "next/navigation";

import { LeaveIcon } from "@superdao/icons";
import { cn } from "@superdao/lib/utils";
import { DropdownMenuItem } from "@superdao/ui/components/dropdown-menu";

import { useSessionStore } from "@/entities/session";

export interface LogoutMenuItemProps extends ComponentPropsWithRef<typeof DropdownMenuItem> {}

/**
 * Renders a menu action that clears the demo session.
 */
export function LogoutMenuItem({ ref, className, ...props }: LogoutMenuItemProps) {
	const router = useRouter();
	const resetSession = useSessionStore((state) => state.resetSession);

	/**
	 * Clears the current session and returns to authentication.
	 */
	function logOut() {
		resetSession();
		router.replace("/auth");
	}

	return (
		<DropdownMenuItem
			ref={ref}
			data-slot="logout-menu-item"
			className={cn("h-10 gap-3 rounded-none px-3 text-[15px]/[24px] font-semibold", className)}
			onClick={logOut}
			{...props}
		>
			<LeaveIcon size={24} />
			Log out
		</DropdownMenuItem>
	);
}
