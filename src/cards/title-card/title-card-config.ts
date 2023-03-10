import { assign, object, optional, string } from "superstruct";
import {
  ActionConfig,
  LovelaceCardConfig,
} from "../../../homeassistant-frontend/src/data/lovelace";
import { actionConfigStruct } from "../../../homeassistant-frontend/src/panels/lovelace/editor/structs/action-struct";
import { baseLovelaceCardConfig } from "../../../homeassistant-frontend/src/panels/lovelace/editor/structs/base-card-struct";

export interface TitleCardConfig extends LovelaceCardConfig {
  title: string;
  color?: string;
  tap_action?: ActionConfig;
}

export const titleCardConfigStruct = assign(
  baseLovelaceCardConfig,
  object({
    title: string(),
    color: optional(string()),
    tap_action: optional(actionConfigStruct),
  })
);
