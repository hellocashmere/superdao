"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface InputGroupProps extends React.ComponentProps<"div"> {}

/**
 * Renders the input group component.
 *
 * Composition:
 * ```text
 * InputGroup
 * ├── InputGroupAddon
 * ├── InputGroupButton
 * ├── InputGroupText
 * ├── InputGroupInput
 * └── InputGroupTextarea
 * ```
 *
 * @see https://react.dev/reference/react/Component
 */
export function InputGroup({ className, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-10 w-full min-w-0 items-center rounded-lg bg-field text-foreground transition-[background-color,color,box-shadow] duration-150 outline-none focus-within:bg-field hover:not-focus-within:bg-field-hover in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-field-hover has-disabled:text-field-disabled-foreground has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/40 has-[[data-slot][aria-invalid=true]]:bg-field has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-2 has-[>[data-align=inline-start]]:[&>input]:pl-2",
        className
      )}
      {...props}
    />
  )
}
