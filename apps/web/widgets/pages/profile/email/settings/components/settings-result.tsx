"use client";

import type { ComponentPropsWithRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@superdao/lib/utils";
import { buttonVariants } from "@superdao/ui/components/button";

import { useSessionStore } from "@/entities/session";
import { useUserStore } from "@/entities/user";

export type EmailSettingsResultState = "confirmed" | "expired";

export interface EmailSettingsResultProps extends ComponentPropsWithRef<"div"> {
  state: EmailSettingsResultState;
}

/**
 * Renders a full-screen email confirmation result.
 */
export function EmailSettingsResult({ className, ref, state, ...props }: EmailSettingsResultProps) {
  const userID = useSessionStore((store) => store.userID);
  const email = useUserStore((store) => store.users.find((user) => user.id === userID)?.email ?? "");
  const isConfirmed = state === "confirmed";

  return (
    <div
      {...props}
      ref={ref}
      data-slot="email-settings-result"
      data-state={state}
      className={cn("fixed inset-0 z-50 flex min-h-svh items-center justify-center bg-background px-4", className)}
    >
      <Image
        src="/auth/superdao-symbol.svg"
        alt="Superdao"
        width={36}
        height={36}
        className="absolute top-4 left-3.5 size-9"
        priority
      />
      <div className="flex w-full max-w-148 flex-col items-center px-4 py-8 text-center">
        <Image
          src={isConfirmed ? "/illustrations/email-confirmed.png" : "/illustrations/email-expired.png"}
          alt=""
          width={200}
          height={200}
          className="size-50"
          priority
        />
        <div className="mt-4 flex flex-col gap-2">
          <h1 className="font-heading text-2xl/7 font-bold">
            {isConfirmed ? "New email confirmed" : "Link has been expired"}
          </h1>
          <p className="text-[15px]/6 text-muted-foreground">
            {isConfirmed ? (
              <>
                Your primary email has been changed to{" "}
                <strong className="font-semibold text-muted-foreground">{email}</strong>
              </>
            ) : (
              "Please try again"
            )}
          </p>
        </div>
        <Link
          className={buttonVariants({ className: "mt-6 px-6" })}
          href={isConfirmed ? "/profile/settings" : "/profile/email/settings"}
        >
          {isConfirmed ? "Go to profile" : "Go to settings"}
        </Link>
      </div>
    </div>
  );
}
