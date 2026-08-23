"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"

import type { ComponentPropsWithRef } from "react"

export interface SelectProps extends ComponentPropsWithRef<
  typeof SelectPrimitive.Root
> {}

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
 * ├── SelectSeparator
 * ├── SelectTrigger
 * └── SelectValue
 * ```
 *
 * @see https://base-ui.com/react/components/select
 */
export function Select(props: SelectProps) {
  return <SelectPrimitive.Root {...props} />
}
