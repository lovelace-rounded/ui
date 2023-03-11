import { assign, object, optional, string } from "superstruct";
import { LovelaceCardConfig } from "../../ha";
import { ActionsSharedConfig, actionsSharedConfigStruct } from "../../shared/config/actions-config";
import { lovelaceCardConfigStruct } from "../../shared/config/lovelace-card-config";

export type TitleCardConfig = LovelaceCardConfig &
    ActionsSharedConfig & {
        title: string;
        color?: string;
    };

export const titleCardConfigStruct = assign(
    lovelaceCardConfigStruct,
    actionsSharedConfigStruct,
    object({
        title: string(),
        color: optional(string()),
    })
);
