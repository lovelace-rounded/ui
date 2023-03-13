import { Appearance, AppearanceSharedConfig } from "../shared/config/appearance-config";
import { IconType, Info } from "./info";

type AdditionalConfig = { [key: string]: any };

export function computeAppearance(config: AppearanceSharedConfig & AdditionalConfig): Appearance {
    return {
        primary_info: config.primary_info ?? getDefaultPrimaryInfo(config),
        secondary_info: config.secondary_info ?? getDefaultSecondaryInfo(config),
        icon_type: config.icon_type ?? getDefaultIconType(config),
    };
}

function getDefaultIconType(config: AdditionalConfig): IconType {
    if (config.hide_icon) {
        return "none";
    }
    if (config.use_entity_picture || config.use_media_artwork) {
        return "entity-picture";
    }
    return "icon";
}

function getDefaultPrimaryInfo(config: AdditionalConfig): Info {
    if (config.hide_name) {
        return "none";
    }
    return "name";
}

function getDefaultSecondaryInfo(config: AdditionalConfig): Info {
    if (config.hide_state) {
        return "none";
    }
    return "state";
}
