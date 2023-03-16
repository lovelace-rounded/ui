import { Condition, HomeAssistant, LovelaceCardConfig, LovelaceConfig } from "../../ha";

export interface LovelaceGenericElementEditor extends HTMLElement {
    hass?: HomeAssistant;
    lovelace?: LovelaceConfig;
    setConfig(config: any): void;
    focusYamlEditor?: () => void;
}

export interface ConditionalCardConfig extends LovelaceCardConfig {
    card: LovelaceCardConfig;
    conditions: Condition[];
}
