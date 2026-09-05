"use client";

import type { ChangeEvent, ComponentPropsWithRef } from "react";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { AddIcon, CameraIcon, CloseIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";
import { Button } from "@superdao/ui/components/button";
import { Field, FieldError, FieldLabel } from "@superdao/ui/components/field";
import { Input } from "@superdao/ui/components/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@superdao/ui/components/input-group";
import { toast } from "@superdao/ui/components/toast";
import { z } from "zod";

import { useOrganizationStore } from "@/entities/organization";

const walletIDSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === "" || /^0x[a-fA-F0-9]{40}$/.test(value) || /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.eth$/i.test(value),
    "Enter a valid wallet address or ENS name."
  );

const settingsSchema = z.object({
  admins: z.array(z.object({ wallet: walletIDSchema })),
  avatarUrl: z.string(),
  name: z.string().trim().min(1, "Organization name is required."),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and single hyphens only."),
});

type Settings = z.infer<typeof settingsSchema>;

export interface SettingsFormProps extends ComponentPropsWithRef<"form"> {}

/**
 * Renders controls for changing the active organization's settings.
 */
export function SettingsForm({ className, ref, ...props }: SettingsFormProps) {
  const activeOrganization = useOrganizationStore((state) =>
    state.organizations.find((organization) => {
      return organization.id === state.activeOrganizationID;
    })
  );
  const updateOrganization = useOrganizationStore((state) => state.updateOrganization);
  const form = useForm<Settings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      admins: [...(activeOrganization?.admins ?? []).map((wallet) => ({ wallet })), { wallet: "" }],
      avatarUrl: activeOrganization?.avatarUrl ?? "",
      name: activeOrganization?.name ?? "",
      slug: activeOrganization?.slug ?? "",
    },
  });
  const admins = useFieldArray({
    name: "admins",
    control: form.control,
  });
  const avatarUrl = useWatch({
    name: "avatarUrl",
    control: form.control,
  });

  useEffect(() => {
    if (!activeOrganization) return;

    form.reset({
      admins: [...(activeOrganization.admins ?? []).map((wallet) => ({ wallet })), { wallet: "" }],
      avatarUrl: activeOrganization.avatarUrl,
      name: activeOrganization.name,
      slug: activeOrganization.slug,
    });
  }, [activeOrganization, form]);

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

  function saveSettings(values: Settings) {
    if (!activeOrganization) return;

    const normalizedAdmins = values.admins.map(({ wallet }) => wallet.trim()).filter(Boolean);
    const normalizedSettings = {
      admins: normalizedAdmins,
      avatarUrl: values.avatarUrl,
      name: values.name.trim(),
      slug: values.slug.trim(),
    };

    updateOrganization(activeOrganization.id, normalizedSettings);
    form.reset({
      ...normalizedSettings,
      admins: [...normalizedAdmins.map((wallet) => ({ wallet })), { wallet: "" }],
    });
    toast.add({
      title: "Settings saved",
      description: "Your organization settings have been updated.",
      type: "success",
    });
  }

  if (!activeOrganization) return null;

  return (
    <form
      {...props}
      ref={ref}
      noValidate
      data-slot="settings-form"
      className={cn("flex h-full min-h-0 flex-col", className)}
      onSubmit={form.handleSubmit(saveSettings)}
    >
      <div className="no-scrollbar min-h-0 flex-1 scroll-fade overflow-y-auto px-1">
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex justify-center py-2">
            <label className="group relative cursor-pointer rounded-full outline-none focus-within:ring-2 focus-within:ring-ring/40">
              <span className="sr-only">Choose organization image</span>
              <Avatar
                size="xxl"
                className="bg-[#343a46] after:border-black/4"
              >
                {avatarUrl ? (
                  <AvatarImage
                    src={avatarUrl}
                    alt="Organization image preview"
                  />
                ) : null}
                <span
                  data-slot="avatar-camera"
                  data-has-image={Boolean(avatarUrl)}
                  className="absolute inset-0 flex items-center justify-center rounded-full text-[#b9bfcb] transition-colors group-hover:bg-black/20 group-hover:text-white data-[has-image=true]:opacity-0 group-hover:data-[has-image=true]:opacity-100"
                >
                  <CameraIcon
                    size={38}
                    aria-hidden="true"
                    className="text-foreground opacity-90"
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
                  htmlFor="organization-name"
                  className="h-10 items-center text-[15px]/6 font-semibold"
                >
                  Organization name
                </FieldLabel>
                <Input
                  {...field}
                  id="organization-name"
                  autoComplete="organization"
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
            name="slug"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className="gap-0"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel
                  htmlFor="public-link"
                  className="h-10 items-center text-[15px]/6 font-semibold"
                >
                  Public link
                </FieldLabel>
                <InputGroup>
                  <InputGroupAddon className="pr-0">superdao.co/</InputGroupAddon>
                  <InputGroupInput
                    {...field}
                    id="public-link"
                    aria-invalid={fieldState.invalid}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </InputGroup>
                {fieldState.invalid ? (
                  <FieldError
                    className="mt-1"
                    errors={[fieldState.error]}
                  />
                ) : null}
              </Field>
            )}
          />

          <Field className="gap-0">
            <FieldLabel className="h-10 items-center text-[15px]/6 font-semibold">Admins</FieldLabel>
            <div className="flex flex-col gap-4">
              {admins.fields.map((admin, index) => (
                <Controller
                  key={admin.id}
                  name={`admins.${index}.wallet`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      className="gap-1"
                      data-invalid={fieldState.invalid}
                    >
                      <div className="flex items-center gap-4">
                        <Input
                          {...field}
                          aria-label={`Admin ${index + 1}`}
                          aria-invalid={fieldState.invalid}
                          placeholder="Wallet address or ENS"
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck={false}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-foreground"
                          aria-label={`Remove admin ${index + 1}`}
                          onClick={() => admins.remove(index)}
                        >
                          <CloseIcon className="size-4!" />
                        </Button>
                      </div>
                      {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
                    </Field>
                  )}
                />
              ))}
            </div>
            <div className="mt-3">
              <Button
                type="button"
                variant="ghost"
                className="gap-4 px-0 hover:bg-transparent active:translate-y-0 active:bg-transparent aria-expanded:bg-transparent"
                onClick={() => admins.append({ wallet: "" })}
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                  <AddIcon size={24} />
                </span>
                Add admin
              </Button>
            </div>
          </Field>
        </div>
      </div>

      <div className="shrink-0 bg-background py-4">
        <Button
          type="submit"
          className="px-6"
          disabled={form.formState.isSubmitting}
        >
          Save changes
        </Button>
      </div>
    </form>
  );
}
