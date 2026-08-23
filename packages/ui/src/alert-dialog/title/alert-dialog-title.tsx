"use client"

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"

import { cn } from "@superdao/ui/lib/utils"

export interface AlertDialogTitleProps
  extends AlertDialogPrimitive.Title.Props {}

/**
 * Labels the alert dialog for assistive technology.
 *
 * @see https://base-ui.com/react/components/alert-dialog
 */
export function AlertDialogTitle({
  className,
  ref,
  ...props
}: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      data-slot="alert-dialog-title"
      className={cn(
        "w-full font-heading text-2xl leading-7 font-bold tracking-[0.36px]",
        className
      )}
      {...props}
    />
  )
}
