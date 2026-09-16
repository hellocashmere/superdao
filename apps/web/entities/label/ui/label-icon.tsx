import type { ComponentPropsWithRef, ElementType } from "react";

import {
	AppearanceBoldIcon,
	BirdBoldIcon,
	BotBoldIcon,
	BriefcaseBoldIcon,
	DeveloperBoldIcon,
	DonationBoldIcon,
	FashionRBoldIcon,
	HunterBoldIcon,
	ItemBoldIcon,
	LikeBoldIcon,
	MegaphoneBoldIcon,
	MonetBoldIcon,
	MusicRBoldIcon,
	ThumbsUpBoldIcon,
	ToolsBoldIcon,
	TraderBoldIcon,
	WhaleBoldIcon,
} from "@superdao/icons/bold";

const labelIcons: Readonly<Record<string, ElementType>> = {
	art: AppearanceBoldIcon,
	music: MusicRBoldIcon,
	fashion: FashionRBoldIcon,
	luxury: DonationBoldIcon,
	developer: DeveloperBoldIcon,
	professional: BriefcaseBoldIcon,
	"early-adopter": BirdBoldIcon,
	whale: WhaleBoldIcon,
	influencer: MegaphoneBoldIcon,
	gamer: ToolsBoldIcon,
	hunter: HunterBoldIcon,
	"defi-trader": TraderBoldIcon,
	"nft-trader": ItemBoldIcon,
	"token-investor": MonetBoldIcon,
	donor: LikeBoldIcon,
	voter: ThumbsUpBoldIcon,
	"non-human": BotBoldIcon,
};

export interface LabelIconProps extends ComponentPropsWithRef<typeof MusicRBoldIcon> {
	labelSlug: string;
}

/**
 * Renders the domain icon associated with a label slug.
 */
export function LabelIcon({ ref, labelSlug, ...props }: LabelIconProps) {
	const Icon = labelIcons[labelSlug] ?? AppearanceBoldIcon;

	return (
		<Icon
			ref={ref}
			{...props}
		/>
	);
}
