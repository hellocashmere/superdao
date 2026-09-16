import type { ReportingDTO } from "../api/types/types";
import type { ReportingView } from "../model/types/types";

/**
 * Converts a `ReportingDTO` -> `ReportingView`.
 */
export function ReportingDTOToView(dto: ReportingDTO): ReportingView {
	return {
		id: Number(dto.id),
		title: dto.title,
		walletCount: dto.wallet_count,
		wallets: dto.wallets.map((wallet) => ({
			id: Number(wallet.id),
			wallet: wallet.wallet,
			avatar: wallet.avatar,
			occurredAt: wallet.occurred_at,
			rank: wallet.rank,
			target: wallet.target,
			source: wallet.source,
			labels: [...wallet.labels],
			balance: wallet.balance,
			nfts: wallet.nfts,
			contacts: [...wallet.contacts],
		})),
		sourceSummaries: dto.source_summaries.map((summary) => ({
			title: summary.title,
			rows: summary.rows.map((row) => ({
				source: row.source,
				count: row.count,
				percent: row.percent,
				width: row.width,
			})),
		})),
		conversionData: dto.conversion_data.map((datum) => ({
			date: datum.date,
			pageView: datum.page_view,
			walletConnect: datum.wallet_connect,
			mint: datum.mint,
		})),
	};
}
