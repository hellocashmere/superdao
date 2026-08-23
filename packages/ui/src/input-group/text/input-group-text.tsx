"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface InputGroupTextProps extends React.ComponentProps<"span"> {}

/**
 * Renders the input group text component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-[15px] leading-6 text-field-placeholder [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}
