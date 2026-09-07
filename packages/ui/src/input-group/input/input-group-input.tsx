import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";
import { Input } from "@superdao/ui/components/input";

export interface InputGroupInputProps extends ComponentProps<"input"> {}

/**
 * Renders the input group input component.
 */
export function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none bg-transparent shadow-none ring-0 hover:not-focus-visible:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 disabled:bg-transparent aria-invalid:bg-transparent aria-invalid:ring-0",
        className
      )}
      {...props}
    />
  );
}
