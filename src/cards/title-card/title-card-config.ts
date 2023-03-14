import { any, assign, object, optional, string } from "superstruct";
import { LovelaceCardConfig } from "../../ha";
import { ActionsSharedConfig, actionsSharedConfigStruct } from "../../shared/config/actions-config";
import { lovelaceCardConfigStruct } from "../../shared/config/lovelace-card-config";
import { TitleCardPillConfig } from "./title-card-pill-config";

export type TitleCardConfig = LovelaceCardConfig &
    ActionsSharedConfig & {
        title: string;
        text_color?: string;
        pill?: TitleCardPillConfig;
    };

export const titleCardConfigStruct = assign(
    lovelaceCardConfigStruct,
    actionsSharedConfigStruct,
    object({
        title: string(),
        text_color: optional(string()),
        pill: optional(any()),
    })
);
