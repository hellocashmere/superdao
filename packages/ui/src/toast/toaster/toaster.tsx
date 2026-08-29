"use client";

import type { ReactNode } from "react";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";

import { ToastAction } from "../action/toast-action";
import { ToastClose } from "../close/toast-close";
import { ToastContent } from "../content/toast-content";
import { ToastDescription } from "../description/toast-description";
import { toast } from "../manager/toast";
import { ToastPortal } from "../portal/toast-portal";
import { ToastProvider } from "../provider/toast-provider";
import { Toast } from "../root/toast";
import { ToastTitle } from "../title/toast-title";
import { ToastViewport } from "../viewport/toast-viewport";

function ToastIcon({ type }: { type: string | undefined }) {
  let icon: ReactNode = null;

  if (type === "success") {
    icon = (
      <CircleCheckIcon
        className="text-constructive"
        aria-hidden="true"
      />
    );
  }

  if (type === "info") {
    icon = (
      <InfoIcon
        className="text-blue-400"
        aria-hidden="true"
      />
    );
  }

  if (type === "warning") {
    icon = (
      <TriangleAlertIcon
        className="text-orange"
        aria-hidden="true"
      />
    );
  }

  if (type === "error") {
    icon = (
      <OctagonXIcon
        className="text-destructive"
        aria-hidden="true"
      />
    );
  }

  if (type === "loading") {
    icon = (
      <Loader2Icon
        className="animate-spin text-muted-foreground"
        aria-hidden="true"
      />
    );
  }

  if (!icon) {
    return null;
  }

  return (
    <span
      data-slot="toast-icon"
      className="shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4"
    >
      {icon}
    </span>
  );
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager();

  return toasts.map((toastItem) => (
    <Toast
      key={toastItem.id}
      toast={toastItem}
    >
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
        <ToastClose />
      </ToastContent>
    </Toast>
  ));
}

export interface ToasterProps extends ToastPrimitive.Provider.Props {}

/**
 * Renders the toaster component.
 *
 * @see https://base-ui.com/react/components/toast
 */
export function Toaster({ children, toastManager = toast, ...props }: ToasterProps) {
  return (
    <ToastProvider
      toastManager={toastManager}
      {...props}
    >
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}
