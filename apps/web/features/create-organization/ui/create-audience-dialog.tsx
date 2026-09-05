"use client";

import type { ChangeEvent, ComponentPropsWithRef } from "react";
import { useState } from "react";

import { CloseIcon, DocumentIcon, EthereumIcon, ListIcon, NftIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@superdao/ui/components/dialog";
import { Input } from "@superdao/ui/components/input";

interface AudienceFileStats {
  invalid: number;
  total: number;
  valid: number;
}

const audienceSources = [
  {
    description: "Upload a file...",
    icon: ListIcon,
    id: "csv",
    title: "CSV file",
  },
  {
    description: "Add contract address",
    icon: NftIcon,
    id: "nft",
    title: "NFT collection",
  },
  {
    description: "Request audience",
    icon: EthereumIcon,
    id: "token",
    title: "Token contract",
  },
  {
    description: "Request custom audience",
    icon: DocumentIcon,
    id: "dapp",
    title: "Dapp contract",
  },
] as const;

export interface CreateAudienceDialogProps extends ComponentPropsWithRef<typeof Dialog> {
  onCreate: (name: string) => void;
}

/** Renders audience source selection and the CSV audience creation form. */
export function CreateAudienceDialog({ onCreate, onOpenChange, open, ...props }: CreateAudienceDialogProps) {
  const [view, setView] = useState<"sources" | "csv">("sources");
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [fileStats, setFileStats] = useState<AudienceFileStats | null>(null);

  function changeOpen(nextOpen: boolean) {
    if (!nextOpen) {
      setView("sources");
      setName("");
      setFileName("");
      setFileError("");
      setFileStats(null);
    }

    onOpenChange?.(nextOpen, undefined as never);
  }

  async function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFileName(file.name);
    setFileStats(null);

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setFileError("Wrong file format");
      return;
    }

    const lines = (await file.text())
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    const invalid = lines.filter((line) => !/^0x.+/i.test(line)).length;

    if (lines.length > 300_000) {
      setFileError("The file contains more than 300k wallets");
      return;
    }

    setFileError("");
    setFileStats({ invalid, total: lines.length, valid: lines.length - invalid });
  }

  const canCreate = Boolean(name.trim()) && Boolean(fileStats?.valid) && !fileError;

  return (
    <Dialog
      {...props}
      open={open}
      onOpenChange={changeOpen}
    >
      {view === "sources" ? (
        <DialogContent
          className="sm:max-w-[400px]"
          showCloseButton={false}
        >
          <DialogHeader className="relative pb-2">
            <DialogTitle>Create audience</DialogTitle>
            <DialogDescription className="sr-only">Choose how to create the first audience.</DialogDescription>
            <button
              type="button"
              className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-lg text-[#717a8c] transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Close audience dialog"
              onClick={() => changeOpen(false)}
            >
              <CloseIcon className="size-5" />
            </button>
          </DialogHeader>
          <DialogBody className="px-2 pt-0 pb-2">
            {audienceSources.map((source) => {
              const Icon = source.icon;
              const isAvailable = source.id === "csv";

              return (
                <button
                  key={source.id}
                  type="button"
                  aria-disabled={!isAvailable}
                  data-available={isAvailable ? "true" : "false"}
                  className="flex h-14 w-full items-center gap-4 rounded-lg px-4 text-left transition-colors hover:bg-white/5 aria-disabled:cursor-default aria-disabled:hover:bg-transparent"
                  onClick={() => {
                    if (isAvailable) {
                      setView("csv");
                    }
                  }}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#465065] text-[#a2a8b4]">
                    <Icon className="size-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px]/6 font-semibold text-white">{source.title}</span>
                    <span className="block text-[13px]/[18px] text-[#a2a8b4]">{source.description}</span>
                  </span>
                </button>
              );
            })}
          </DialogBody>
        </DialogContent>
      ) : (
        <DialogContent
          className="sm:max-w-[400px]"
          showCloseButton={false}
        >
          <DialogHeader className="pb-2">
            <DialogTitle>Create audience</DialogTitle>
            <DialogDescription className="sr-only">
              Name the audience and upload a CSV file containing wallet addresses.
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="space-y-3 pt-0">
            <Input
              value={name}
              placeholder="Name the audience"
              aria-label="Audience name"
              onChange={(event) => setName(event.target.value)}
            />
            <label
              data-slot="audience-file-field"
              data-state={fileError ? "invalid" : fileName ? "selected" : "empty"}
              className={cn(
                "flex h-10 cursor-pointer items-center truncate rounded-lg bg-field px-4 text-[15px]/6 text-field-placeholder transition-colors hover:bg-field-hover",
                "data-[state=invalid]:text-destructive data-[state=selected]:text-foreground"
              )}
            >
              <span className="truncate">{fileName || "Upload CSV file"}</span>
              <input
                type="file"
                accept=".csv,text/csv"
                className="sr-only"
                onChange={selectFile}
              />
            </label>
            {fileError ? (
              <p className="px-4 text-[13px]/[18px] text-destructive">{fileError}</p>
            ) : (
              <p className="px-4 text-[13px]/[18px] text-[#717a8c]">
                Each line should contain a single wallet data.
                <br />
                300k wallets max
              </p>
            )}

            {fileStats ? (
              <dl className="mt-4 rounded-lg bg-field px-4 py-3 text-[13px]/[18px]">
                <div className="flex justify-between text-[#a2a8b4]">
                  <dt>Total lines in file</dt>
                  <dd>{fileStats.total.toLocaleString("en-US")}</dd>
                </div>
                <div className="flex justify-between text-[#a2a8b4]">
                  <dt>Already added</dt>
                  <dd>0</dd>
                </div>
                <div className="flex justify-between text-destructive">
                  <dt>Invalid</dt>
                  <dd>{fileStats.invalid.toLocaleString("en-US")}</dd>
                </div>
                <div className="flex justify-between text-[#50e3a4]">
                  <dt>To be added</dt>
                  <dd>{fileStats.valid.toLocaleString("en-US")}</dd>
                </div>
              </dl>
            ) : null}
          </DialogBody>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setView("sources")}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="px-6"
              disabled={!canCreate}
              onClick={() => onCreate(name.trim())}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
