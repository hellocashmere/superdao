"use client"

import { cn } from "@superdao/ui/lib/utils"

import { Separator } from "@superdao/ui/components/separator"

export interface FieldSeparatorProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode
}

/**
 * Renders the field separator component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function FieldSeparator({
  children,
  className,
  ...props
}: FieldSeparatorProps) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}
