import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface TextareaProps extends React.ComponentProps<"textarea"> {}

/**
 * Renders the textarea component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg bg-field px-4 py-2 text-[15px] leading-6 font-normal tracking-[-0.24px] text-foreground transition-[background-color,color,box-shadow] duration-150 outline-none placeholder:text-field-placeholder hover:not-focus-visible:bg-field-hover focus-visible:bg-field focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:bg-field-hover disabled:text-field-disabled-foreground disabled:opacity-100 disabled:placeholder:text-field-disabled-foreground aria-invalid:bg-field aria-invalid:text-destructive aria-invalid:ring-0 aria-invalid:placeholder:text-destructive",
        className
      )}
      {...props}
    />
  )
}
