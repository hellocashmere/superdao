"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface TableBodyProps extends React.ComponentProps<"tbody"> {}

/**
 * Renders the table body component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}
