import { isEthereumAddress } from "./eth";

const walletDomainPattern = /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

/**
 * Returns whether a value is an address or a dot-separated wallet domain.
 */
export function isWalletIdentifier(value: string) {
	const wallet = value.trim();

	return isEthereumAddress(wallet) || walletDomainPattern.test(wallet);
}
