"use client";

import type { ComponentPropsWithRef } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebounceValue } from "@superdao/hooks";
import { CloseIcon, DoneIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@superdao/ui/components/input-group";
import { Spinner } from "@superdao/ui/components/spinner";

import { useGetWalletByName } from "@/entities/wallet";
import { isEthereumAddress } from "@/shared/lib/crypto";
import { exploreRoutes } from "@/shared/lib/routes";

type WalletValidationState = "idle" | "validating" | "valid" | "invalid";

export interface WalletSearchProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders a wallet search field with debounced URL synchronization and validation feedback.
 */
export function WalletSearch({ className, ref, ...props }: WalletSearchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [debouncedQuery] = useDebounceValue(query, 600);
  const wallet = query.trim();
  const debouncedWallet = debouncedQuery.trim();
  const isDebounced = wallet === debouncedWallet;
  const isWalletFormatValid = isEthereumAddress(wallet);
  const walletQuery = useGetWalletByName(isDebounced && isEthereumAddress(debouncedWallet) ? debouncedWallet : "");

  useEffect(() => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    const debouncedIdentifier = debouncedQuery.trim();

    if (debouncedIdentifier) {
      nextSearchParams.set("q", debouncedIdentifier);
    } else {
      nextSearchParams.delete("q");
    }

    const nextQueryString = nextSearchParams.toString();

    if (nextQueryString !== searchParams.toString()) {
      router.replace(nextQueryString ? `${pathname}?${nextQueryString}` : pathname, { scroll: false });
    }
  }, [debouncedQuery, pathname, router, searchParams]);

  function getWalletValidationState(): WalletValidationState {
    if (!wallet) {
      return "idle";
    }

    if (!isWalletFormatValid) {
      return "invalid";
    }

    if (!isDebounced || walletQuery.isFetching) {
      return "validating";
    }

    return walletQuery.data && !walletQuery.isError ? "valid" : "invalid";
  }

  const validationState = getWalletValidationState();
  const validationIcon = {
    idle: null,
    validating: <Spinner className="size-4 text-muted-foreground" />,
    valid: <DoneIcon className="size-4 text-constructive" />,
    invalid: <CloseIcon className="size-4 text-destructive" />,
  }[validationState];

  return (
    <div
      {...props}
      ref={ref}
      data-slot="wallet-search"
      className={cn("w-full max-w-112.5", className)}
    >
      <InputGroup>
        <InputGroupInput
          aria-label="Wallet address"
          placeholder="Wallet address or ENS"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && walletQuery.data) {
              router.push(exploreRoutes.wallet(walletQuery.data.id));
            }
          }}
        />
        {validationIcon ? (
          <InputGroupAddon
            align="inline-end"
            className="cursor-default"
            aria-live="polite"
          >
            {validationIcon}
          </InputGroupAddon>
        ) : null}
      </InputGroup>
    </div>
  );
}
