"use client";

import type { ComponentPropsWithRef } from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";

export interface SelectProps extends ComponentPropsWithRef<typeof SelectPrimitive.Root> {}

/**
 * Renders the select component.
 *
 * Composition:
 * ```text
 * Select
 * ├── SelectContent
 * ├── SelectGroup
 * ├── SelectItem
 * ├── SelectLabel
 * ├── SelectScrollDownButton
 * ├── SelectScrollUpButton
 * ├── SelectTrigger
 * └── SelectValue
 * ```
 *
 * @see https://base-ui.com/react/components/select
 */
export function Select(props: SelectProps) {
  return <SelectPrimitive.Root {...props} />;
}
