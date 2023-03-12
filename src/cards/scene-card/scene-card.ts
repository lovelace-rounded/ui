import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators";
import { HomeAssistant, LovelaceCard, LovelaceCardEditor } from "../../ha";
import { RoundedBaseElement } from "../../utils/base-element";
import { registerCustomCard } from "../../utils/custom-cards";
import { SCENE_CARD_EDITOR_NAME, SCENE_CARD_NAME } from "./const";
import { SceneCardButton } from "./scene-card-button";
import { SceneCardConfig } from "./scene-card-config";

registerCustomCard({
    name: "Rounded scene card",
    type: SCENE_CARD_NAME,
    description: "Scene card with buttons",
});

@customElement(SCENE_CARD_NAME)
export class SceneCard extends RoundedBaseElement implements LovelaceCard {
    @state() private _config?: SceneCardConfig;
    @state() private _buttons: SceneCardButton[] = [];

    public static async getConfigElement(): Promise<LovelaceCardEditor> {
        await import("./scene-card-editor");
        return document.createElement(SCENE_CARD_EDITOR_NAME) as LovelaceCardEditor;
    }

    public static async getStubConfig(_hass: HomeAssistant): Promise<SceneCardConfig> {
        return {
            type: `custom:${SCENE_CARD_NAME}`,
        };
    }

    public getCardSize(): number {
        return 1;
    }

    public setConfig(config: SceneCardConfig): void {
        this._config = {
            ...config,
        };
    }

    protected render() {
        if (!this._config || !this.hass) {
            return nothing;
        }

        return html`<ha-card
            >Scene card
            ${this._buttons.length > 0
                ? html`<rounded-scene-card-button></rounded-scene-card-button>`
                : nothing}
        </ha-card>`;
    }
}
