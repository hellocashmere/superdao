"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface TableHeaderProps extends React.ComponentProps<"thead"> {}

/**
 * Renders the table header component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}
