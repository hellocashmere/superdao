"use client";

import type { ChangeEvent, ComponentPropsWithRef } from "react";
import { useEffect, useRef } from "react";
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

import {
	useGetOrganizationByID,
	useGetOrganizations,
	useOrganizationSelection,
	useUpdateOrganization,
} from "@/entities/organization";

import type { OrganizationSettingsFormValues } from "../model/form";
import {
	getOrganizationSettingsFormDefaults,
	normalizeOrganizationSettingsForm,
	organizationSettingsFormSchema,
} from "../model/form";

export interface SettingsFormProps extends ComponentPropsWithRef<"form"> {}

/**
 * Renders controls for changing the active organization's settings.
 */
export function SettingsForm({ ref, className, ...props }: SettingsFormProps) {
	const organizationsQuery = useGetOrganizations();
	const { activeOrganizationID, setActiveOrganizationID } = useOrganizationSelection();
	const activeOrganizationQuery = useGetOrganizationByID(activeOrganizationID);
	const updateOrganization = useUpdateOrganization();
	const activeOrganization = activeOrganizationQuery.data ?? organizationsQuery.data?.[0];
	const form = useForm<OrganizationSettingsFormValues>({
		resolver: zodResolver(organizationSettingsFormSchema),
		defaultValues: getOrganizationSettingsFormDefaults(activeOrganization),
	});
	const admins = useFieldArray({
		name: "admins",
		control: form.control,
	});
	const avatarUrl = useWatch({
		name: "avatarUrl",
		control: form.control,
	});
	const adminValuesOnFocus = useRef(new Map<string, string>());
	const initializedOrganizationID = useRef<string | undefined>(undefined);

	useEffect(() => {
		if (!activeOrganization || initializedOrganizationID.current === activeOrganization.id) return;

		setActiveOrganizationID(activeOrganization.id);
		initializedOrganizationID.current = activeOrganization.id;

		form.reset(getOrganizationSettingsFormDefaults(activeOrganization));
	}, [activeOrganization, form, setActiveOrganizationID]);

	/**
	 * Validates and loads the selected avatar image.
	 */
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

	/**
	 * Adds an empty administrator wallet field.
	 */
	function addAdmin() {
		admins.append({ wallet: "" });
		toast.add({
			title: "Admin added",
			description: "Enter the new admin's wallet address, then save your changes.",
			type: "success",
		});
	}

	/**
	 * Records the administrator wallet before editing.
	 */
	function startEditingAdmin(fieldID: string, wallet: string) {
		adminValuesOnFocus.current.set(fieldID, wallet);
	}

	/**
	 * Notifies when an administrator wallet changes.
	 */
	function finishEditingAdmin(fieldID: string, wallet: string) {
		const previousWallet = adminValuesOnFocus.current.get(fieldID);
		adminValuesOnFocus.current.delete(fieldID);

		if (previousWallet === undefined || previousWallet === wallet) return;

		toast.add({
			title: "Admin updated",
			description: "The admin's wallet address was changed. Save to apply the update.",
			type: "success",
		});
	}

	/**
	 * Removes an administrator and persists existing-row removals.
	 */
	async function removeAdmin(index: number) {
		const currentAdmins = form.getValues("admins");

		if (!currentAdmins[index] || !activeOrganization) return;

		const nextAdmins = currentAdmins.filter((_, adminIndex) => adminIndex !== index);

		if (index < activeOrganization.admins.length) {
			try {
				const organization = await updateOrganization.mutateAsync({
					organizationID: activeOrganization.id,
					changes: { admins: activeOrganization.admins.filter((_, adminIndex) => adminIndex !== index) },
				});
				form.reset(getOrganizationSettingsFormDefaults(organization));
			} catch {
				toast.add({ title: "Admin not removed", description: "Please try again.", type: "error" });
				return;
			}
		} else {
			admins.replace(nextAdmins);
		}

		toast.add({
			title: "Admin removed",
			description: "The admin was removed and the change was saved.",
			type: "success",
		});
	}

	/**
	 * Normalizes and saves organization settings.
	 */
	async function saveSettings(values: OrganizationSettingsFormValues) {
		if (!activeOrganization) return;

		const normalizedSettings = normalizeOrganizationSettingsForm(values);
		const normalizedAdmins = normalizedSettings.admins.map(({ wallet }) => wallet);

		try {
			const organization = await updateOrganization.mutateAsync({
				organizationID: activeOrganization.id,
				changes: {
					...normalizedSettings,
					admins: normalizedAdmins,
				},
			});
			form.reset(getOrganizationSettingsFormDefaults(organization));
		} catch {
			toast.add({ title: "Settings not saved", description: "Please try again.", type: "error" });
			return;
		}

		toast.add({
			title: "Settings saved",
			description: "Your organization settings have been updated.",
			type: "success",
		});
	}

	if (organizationsQuery.error) throw organizationsQuery.error;
	if (activeOrganizationQuery.error) throw activeOrganizationQuery.error;
	if (!activeOrganization) return null;

	return (
		<form
			ref={ref}
			noValidate
			data-slot="settings-form"
			className={cn("flex h-full min-h-0 flex-col", className)}
			onSubmit={form.handleSubmit(saveSettings)}
			{...props}
		>
			<div className="no-scrollbar min-h-0 flex-1 scroll-fade overflow-y-auto px-1">
				<div className="flex flex-col gap-4 pb-4">
					<div className="flex justify-center py-2">
						<label className="group relative cursor-pointer rounded-full outline-none focus-within:ring-2 focus-within:ring-ring/40">
							<span className="sr-only">Choose organization image</span>
							<Avatar size="xxl">
								{avatarUrl ? (
									<AvatarImage
										src={avatarUrl}
										alt="Organization image preview"
									/>
								) : null}
								<span
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
									<InputGroupAddon className="pr-0">example.co/</InputGroupAddon>
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
													onFocus={() => startEditingAdmin(admin.id, field.value)}
													onBlur={() => {
														field.onBlur();
														finishEditingAdmin(admin.id, field.value);
													}}
												/>
												<Button
													type="button"
													variant="ghost"
													size="icon"
													className="text-muted-foreground hover:text-foreground"
													aria-label={`Remove admin ${index + 1}`}
													onClick={() => void removeAdmin(index)}
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
								onClick={addAdmin}
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
					size="wide"
					disabled={form.formState.isSubmitting || updateOrganization.isPending}
				>
					Save changes
				</Button>
			</div>
		</form>
	);
}
