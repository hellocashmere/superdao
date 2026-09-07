import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

const fieldVariants = cva("group/field flex w-full gap-2 data-[invalid=true]:text-destructive", {
  variants: {
    orientation: {
      vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
      horizontal:
        "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      responsive:
        "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export interface FieldProps extends ComponentProps<"div">, VariantProps<typeof fieldVariants> {}

/**
 * Renders the field component.
 *
 * Composition:
 * ```text
 * Field
 * ├── FieldLabel
 * ├── FieldDescription
 * ├── FieldError
 * ├── FieldGroup
 * ├── FieldLegend
 * ├── FieldSet
 * ├── FieldContent
 * └── FieldTitle
 * ```
 */
export function Field({ className, orientation = "vertical", ...props }: FieldProps) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}
