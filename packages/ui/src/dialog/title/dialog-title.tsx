"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "@superdao/ui/lib/utils"

export interface DialogTitleProps extends DialogPrimitive.Title.Props {}

/**
 * Renders the dialog title component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "w-full font-heading text-2xl leading-7 font-bold tracking-[0.36px]",
        className
      )}
      {...props}
    />
  )
}
