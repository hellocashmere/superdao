/**
 * Shared shape returned by explore resource fixtures.
 */
export interface ExploreResourceFixture {
	id: number;
	slug: string;
	title: string;
	avatar: string;
	owners: number;
	active_wallets: number;
	supply: number;
	price: number;
	chain: "ethereum" | "polygon";
	wallet_count: number;
}
