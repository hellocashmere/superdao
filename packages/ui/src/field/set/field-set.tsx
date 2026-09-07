import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface FieldSetProps extends ComponentProps<"fieldset"> {}

/**
 * Renders the field set component.
 */
export function FieldSet({ className, ...props }: FieldSetProps) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  );
}
