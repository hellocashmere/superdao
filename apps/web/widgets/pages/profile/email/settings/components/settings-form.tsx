"use client";

import type { ComponentPropsWithRef } from "react";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@superdao/ui/components/alert-dialog";
import { Button } from "@superdao/ui/components/button";
import { Field, FieldError, FieldLabel } from "@superdao/ui/components/field";
import { Input } from "@superdao/ui/components/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@superdao/ui/components/tooltip";
import { Clock3Icon } from "lucide-react";
import { z } from "zod";

import { useSessionStore } from "@/entities/session";
import { useUserStore } from "@/entities/user";

const emailSettingsSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
});

type EmailSettings = z.infer<typeof emailSettingsSchema>;

export interface EmailSettingsFormProps extends ComponentPropsWithRef<"form"> {}

/**
 * Renders editable email settings for the current local demo profile.
 */
export function EmailSettingsForm({ className, ref, ...props }: EmailSettingsFormProps) {
  const userID = useSessionStore((state) => state.userID);
  const user = useUserStore((state) => state.users.find((candidate) => candidate.id === userID));
  const updateUser = useUserStore((state) => state.updateUser);
  const [isPending, setIsPending] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [secondsUntilResend, setSecondsUntilResend] = useState(0);
  const form = useForm<EmailSettings>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      email: user?.email ?? "",
    },
  });
  const email = useWatch({
    name: "email",
    control: form.control,
  });
  const normalizedEmail = email.trim();
  const isUnchanged = normalizedEmail === (pendingEmail ?? user?.email ?? "");

  useEffect(() => {
    if (secondsUntilResend <= 0) return;

    const timer = window.setInterval(() => {
      setSecondsUntilResend((seconds) => Math.max(0, seconds - 1));
    }, 1_000);

    return () => window.clearInterval(timer);
  }, [secondsUntilResend]);

  function saveEmail(values: EmailSettings) {
    if (!user) return;

    const nextEmail = values.email.trim();

    form.reset({ email: nextEmail });
    setPendingEmail(nextEmail);
    setIsPending(true);
    setSecondsUntilResend(59);
  }

  function resendVerificationEmail() {
    setSecondsUntilResend(59);
  }

  function removeEmail() {
    if (!user) return;

    updateUser(user.id, { email: "" });
    form.reset({ email: "" });
    setPendingEmail(null);
    setIsPending(false);
    setSecondsUntilResend(0);
  }

  const countdown = `0:${secondsUntilResend.toString().padStart(2, "0")}`;

  if (!user) return null;

  return (
    <form
      ref={ref}
      noValidate
      data-slot="email-settings-form"
      data-state={isPending ? "pending" : user.email ? "added" : "empty"}
      className={cn("flex max-w-140 flex-col", className)}
      onSubmit={form.handleSubmit(saveEmail)}
      {...props}
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            className="gap-0"
            data-invalid={fieldState.invalid}
          >
            <FieldLabel
              htmlFor="profile-email"
              className="h-10 items-center text-[15px]/6 font-semibold"
            >
              Email
            </FieldLabel>
            <div className="flex items-start gap-2">
              <Input
                {...field}
                id="profile-email"
                type="email"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your email"
              />
              {user.email || pendingEmail ? (
                <AlertDialog>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <AlertDialogTrigger
                          render={
                            <Button
                              type="button"
                              variant="secondary"
                              size="icon"
                              aria-label="Remove email"
                              className="text-muted-foreground hover:text-foreground"
                            />
                          }
                        />
                      }
                    >
                      <DeleteIcon className="size-4!" />
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Remove email</TooltipContent>
                  </Tooltip>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove email</AlertDialogTitle>
                      <AlertDialogDescription>Are you sure you want to remove your email?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        className="bg-pink hover:bg-pink/90 active:bg-pink/80"
                        onClick={removeEmail}
                      >
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : null}
            </div>
            {fieldState.invalid ? (
              <FieldError
                className="mt-1"
                errors={[fieldState.error]}
              />
            ) : null}
          </Field>
        )}
      />

      {isPending ? (
        <div
          className="mt-2 flex min-h-5 flex-wrap items-center gap-1.5 text-sm/5"
          aria-live="polite"
        >
          <span className="flex items-center gap-1.5 text-warning">
            <Clock3Icon
              className="size-4"
              aria-hidden="true"
            />
            Unverified
          </span>
          <span className="text-muted-foreground">·</span>
          {secondsUntilResend > 0 ? (
            <span className="text-muted-foreground">Resend verification email in {countdown}</span>
          ) : (
            <button
              type="button"
              className="text-muted-foreground outline-none hover:text-foreground focus-visible:rounded focus-visible:ring-2 focus-visible:ring-ring/40"
              onClick={resendVerificationEmail}
            >
              Send verification email
            </button>
          )}
        </div>
      ) : null}

      <div className="pt-6 in-data-[state=pending]:pt-5">
        <Button
          type="submit"
          className="px-6"
          disabled={form.formState.isSubmitting || isUnchanged || normalizedEmail.length === 0}
        >
          Save changes
        </Button>
      </div>
    </form>
  );
}
