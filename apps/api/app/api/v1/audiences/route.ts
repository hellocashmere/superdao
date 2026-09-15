import { success } from "../../../../shared/api/response";

interface Audience {
	id: number;
	title: string;
	wallet_count: number;
}

const audiences: Audience[] = [
	{
		id: 1,
		title: "cashmere.eth",
		wallet_count: 10_485,
	},
];

/**
 * Serves sidebar audiences.
 */
export async function GET(): Promise<Response> {
	return success(audiences);
}
