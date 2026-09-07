"use client";

import type { ChangeEvent, ComponentPropsWithRef, FormEvent } from "react";
import { useState } from "react";

import { AddIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@superdao/ui/components/dialog";
import { Field, FieldDescription, FieldGroup } from "@superdao/ui/components/field";

export interface AudienceAddDataDialogProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the placeholder CSV upload dialog for audience wallets.
 */
export function AudienceAddDataDialog({ className, ref, ...props }: AudienceAddDataDialogProps) {
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      setFileName("");
    }
  }

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    setFileName(event.target.files?.[0]?.name ?? "");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleOpenChange(false);
  }

  return (
    <div
      {...props}
      ref={ref}
      data-slot="audience-add-data-dialog"
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
          <AddIcon
            data-icon="inline-start"
            className="text-tabs-foreground"
          />
          Add data
        </DialogTrigger>

        <DialogContent showCloseButton={false}>
          <form
            className="contents"
            onSubmit={submit}
          >
            <DialogHeader className="pb-2">
              <DialogTitle>Add wallets</DialogTitle>
              <DialogDescription className="sr-only">
                Upload a CSV file containing wallets to add to this audience.
              </DialogDescription>
            </DialogHeader>

            <DialogBody className="pt-0">
              <FieldGroup>
                <Field>
                  <label
                    data-slot="audience-wallets-file-field"
                    data-state={fileName ? "selected" : "empty"}
                    className="flex h-10 cursor-pointer items-center truncate rounded-lg bg-field px-4 text-[15px]/6 text-field-placeholder transition-colors hover:bg-field-hover data-[state=selected]:text-foreground"
                  >
                    <span className="truncate">{fileName || "Upload CSV file"}</span>
                    <input
                      type="file"
                      accept=".csv,text/csv"
                      className="sr-only"
                      onChange={selectFile}
                    />
                  </label>
                  <FieldDescription>
                    Each line should contain a single wallet data.
                    <br />
                    300k wallets max
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </DialogBody>

            <DialogFooter>
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
                type="submit"
                className="px-6"
                disabled={!fileName}
              >
                Add
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
