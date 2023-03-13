import { assign, object, optional, string } from "superstruct";
import { LovelaceCardConfig } from "../../ha";
import { ActionsSharedConfig, actionsSharedConfigStruct } from "../../shared/config/actions-config";
import { lovelaceCardConfigStruct } from "../../shared/config/lovelace-card-config";
import { Info } from "../../utils/info";

export type TitleCardConfig = LovelaceCardConfig &
    ActionsSharedConfig & {
        title: string;
        text_color?: string;
        entity?: string;
        background_color?: string;
        primary_info?: Info;
        icon?: string;
    };

export const titleCardConfigStruct = assign(
    lovelaceCardConfigStruct,
    actionsSharedConfigStruct,
    object({
        title: string(),
        text_color: optional(string()),
        entity: optional(string()),
        background_color: optional(string()),
        primary_info: optional(string()),
        icon: optional(string()),
    })
);
