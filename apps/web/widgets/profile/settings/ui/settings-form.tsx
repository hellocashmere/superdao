"use client";

import type { ChangeEvent, ComponentPropsWithRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@superdao/ui/components/avatar";
import { Button } from "@superdao/ui/components/button";
import { Field, FieldError, FieldLabel } from "@superdao/ui/components/field";
import { Input } from "@superdao/ui/components/input";
import { toast } from "@superdao/ui/components/toast";
import { z } from "zod";

import { useSessionStore } from "@/entities/session";
import { useUserStore } from "@/entities/user";

const profileSettingsSchema = z.object({
  avatarUrl: z.string(),
  name: z.string().trim().min(1, "Display name is required."),
  wallet: z
    .string()
    .trim()
    .refine(
      (value) => /^0x[a-fA-F0-9]{40}$/.test(value) || /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.eth$/i.test(value),
      "Enter a valid wallet address or ENS name."
    ),
});

type ProfileSettings = z.infer<typeof profileSettingsSchema>;

export interface ProfileSettingsFormProps extends ComponentPropsWithRef<"form"> {}

/**
 * Renders controls for editing the current local demo profile.
 */
export function ProfileSettingsForm({ className, ref, ...props }: ProfileSettingsFormProps) {
  const userID = useSessionStore((state) => state.userID);
  const user = useUserStore((state) => state.users.find((candidate) => candidate.id === userID));
  const updateUser = useUserStore((state) => state.updateUser);
  const form = useForm<ProfileSettings>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      avatarUrl: user?.avatarUrl ?? "",
      name: user?.name ?? "",
      wallet: user?.wallet ?? "",
    },
  });
  const avatarUrl = useWatch({
    name: "avatarUrl",
    control: form.control,
  });
  const displayName = useWatch({
    name: "name",
    control: form.control,
  });

  function selectAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/") || file.size > 256_000) {
      toast.add({
        title: "Small image required",
        description: "Choose a PNG, JPG, WebP, or SVG image under 256 KB.",
        type: "error",
      });
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        form.setValue("avatarUrl", reader.result, { shouldDirty: true });
      }
    });
    reader.readAsDataURL(file);
  }

  function saveProfile(values: ProfileSettings) {
    if (!user) return;

    const profile = {
      avatarUrl: values.avatarUrl,
      name: values.name.trim(),
      wallet: values.wallet.trim(),
    };

    updateUser(user.id, profile);
    form.reset(profile);
    toast.add({
      title: "Profile saved",
      description: "Your local demo profile has been updated.",
      type: "success",
    });
  }

  if (!user) return null;

  return (
    <form
      {...props}
      ref={ref}
      noValidate
      data-slot="profile-settings-form"
      className={cn("flex flex-col gap-4", className)}
      onSubmit={form.handleSubmit(saveProfile)}
    >
      <div className="flex justify-center py-2">
        <label className="group relative cursor-pointer rounded-full outline-none focus-within:ring-2 focus-within:ring-ring/40">
          <span className="sr-only">Choose profile image</span>
          <Avatar
            size="xxl"
            className="bg-[#343a46] after:border-black/4"
          >
            <AvatarImage
              src={avatarUrl}
              alt="Profile image preview"
            />
            <AvatarFallback className="text-2xl font-bold text-white">
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
            <span className="absolute inset-0 flex items-center justify-center rounded-full text-[#b9bfcb] opacity-0 transition-colors group-hover:bg-black/20 group-hover:text-white group-hover:opacity-100">
              <CameraIcon
                size={38}
                aria-hidden="true"
              />
            </span>
          </Avatar>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className="sr-only"
            onChange={selectAvatar}
          />
        </label>
      </div>

      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            className="gap-0"
            data-invalid={fieldState.invalid}
          >
            <FieldLabel
              htmlFor="profile-name"
              className="h-10 items-center"
            >
              Display name
            </FieldLabel>
            <Input
              {...field}
              id="profile-name"
              autoComplete="name"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid ? (
              <FieldError
                className="mt-1"
                errors={[fieldState.error]}
              />
            ) : null}
          </Field>
        )}
      />

      <Controller
        name="wallet"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            className="gap-0"
            data-invalid={fieldState.invalid}
          >
            <FieldLabel
              htmlFor="profile-wallet"
              className="h-10 items-center"
            >
              Wallet
            </FieldLabel>
            <Input
              {...field}
              id="profile-wallet"
              aria-invalid={fieldState.invalid}
              placeholder="Wallet address or ENS"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
            {fieldState.invalid ? (
              <FieldError
                className="mt-1"
                errors={[fieldState.error]}
              />
            ) : null}
          </Field>
        )}
      />

      <div className="pt-6">
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          Save profile
        </Button>
      </div>
    </form>
  );
}
