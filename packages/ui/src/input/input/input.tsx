import * as React from "react"

import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@superdao/ui/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {}

/**
 * Renders the input component.
 *
 * @see https://base-ui.com/react/components/input
 */
export function Input({ className, type, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg bg-field px-4 py-2 text-[15px] leading-6 font-normal tracking-[-0.24px] text-foreground transition-[background-color,color,box-shadow] duration-150 outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-[15px] file:leading-6 file:font-normal file:text-foreground placeholder:text-field-placeholder hover:not-focus-visible:bg-field-hover focus-visible:bg-field focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-field-hover disabled:text-field-disabled-foreground disabled:opacity-100 disabled:placeholder:text-field-disabled-foreground aria-invalid:bg-field aria-invalid:text-destructive aria-invalid:ring-0 aria-invalid:placeholder:text-destructive",
        className
      )}
      {...props}
    />
  )
}
