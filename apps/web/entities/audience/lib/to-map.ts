import type { CreateAudienceDTO, SidebarAudienceDTO } from "../api/types/types";
import type { AudienceView, CreateAudienceInput } from "../model/types/types";

/**
 * Converts a `SidebarAudienceDTO` -> `AudienceView`.
 */
export function SidebarAudienceDTOToView(dto: SidebarAudienceDTO): AudienceView {
	return {
		id: dto.id,
		title: dto.title,
		walletCount: dto.wallet_count,
	};
}

/**
 * Converts a `CreateAudienceInput` -> `CreateAudienceDTO`.
 */
export function CreateAudienceInputToDTO(input: CreateAudienceInput): CreateAudienceDTO {
	return {
		title: input.title,
		wallet_count: input.walletCount,
	};
}
