import { assign, object } from "superstruct";
import { entityId } from "../../../homeassistant-frontend/src/common/structs/is-entity-id";
import { LovelaceCardConfig } from "../../../homeassistant-frontend/src/data/lovelace";
import { baseLovelaceCardConfig } from "../../../homeassistant-frontend/src/panels/lovelace/editor/structs/base-card-struct";

export interface MoreInfoCardConfig extends LovelaceCardConfig {
  entity: string;
}

export const moreInfoCardConfigStruct = assign(
  baseLovelaceCardConfig,
  object({
    entity: entityId(),
  })
);
