/**
 * Returns whether a value has the Ethereum address prefix.
 */
export function isEthereumAddress(value: string) {
	return value.trim().startsWith("0x");
}
