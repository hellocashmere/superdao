"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@superdao/lib/utils";

export interface DialogDescriptionProps extends DialogPrimitive.Description.Props {}

/**
 * Renders the dialog description component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "w-full text-[15px] leading-6 font-normal text-foreground *:[a]:underline *:[a]:underline-offset-3",
        className
      )}
      {...props}
    />
  );
}
