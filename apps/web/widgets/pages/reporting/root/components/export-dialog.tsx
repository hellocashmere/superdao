"use client";

import type { ComponentPropsWithRef } from "react";
import { useEffect, useState } from "react";

import { ShareIcon, SuccessIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@superdao/ui/components/dialog";
import { Spinner } from "@superdao/ui/components/spinner";

type ExportStatus = "confirm" | "preparing" | "exported";

export interface ReportingExportDialogProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the reporting wallet CSV export flow from confirmation through completion.
 */
export function ReportingExportDialog({ className, ref, ...props }: ReportingExportDialogProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ExportStatus>("confirm");

  useEffect(() => {
    if (status !== "preparing") return;

    const completionTimer = window.setTimeout(() => setStatus("exported"), 1800);

    return () => window.clearTimeout(completionTimer);
  }, [status]);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) setStatus("confirm");
  }

  return (
    <div
      {...props}
      ref={ref}
      data-slot="reporting-export-dialog"
      data-state={status}
      className={cn("inline-flex", className)}
    >
      <Dialog
        open={open}
        onOpenChange={handleOpenChange}
      >
        <DialogTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              className="font-normal"
            />
          }
        >
          <ShareIcon
            data-icon="inline-start"
            className="text-tabs-foreground"
          />
          Export
        </DialogTrigger>
        <DialogContent>
          <DialogHeader aria-live="polite">
            <DialogTitle className="flex items-center gap-2">
              {status === "preparing" ? <Spinner className="size-6 text-field-placeholder" /> : null}
              {status === "exported" ? <SuccessIcon className="size-6 text-constructive" /> : null}
              <span>{status === "exported" ? "Exported" : "Export CSV"}</span>
            </DialogTitle>
            {status === "confirm" ? (
              <DialogDescription>
                You can export up to 1000 wallets.
                <br />
                To remove the limit, contact our support team
              </DialogDescription>
            ) : (
              <DialogDescription className="text-tabs-foreground">
                Preparing the file may take a few minutes.
                <br />
                Please wait until download starts.
                <span className="mt-4 block">
                  We&apos;ll also send CSV to your email danila@superdao.co once it&apos;s ready
                </span>
              </DialogDescription>
            )}
          </DialogHeader>
          <DialogFooter>
            {status === "confirm" ? (
              <>
                <DialogClose
                  render={
                    <Button
                      type="button"
                      variant="ghost"
                    />
                  }
                >
                  Cancel
                </DialogClose>
                <Button
                  type="button"
                  onClick={() => setStatus("preparing")}
                >
                  Export
                </Button>
              </>
            ) : (
              <DialogClose render={<Button type="button" />}>Got It</DialogClose>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
