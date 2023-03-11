import { css, CSSResultGroup, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ActionHandlerEvent } from "../../../homeassistant-frontend/src/data/lovelace";
import { handleAction } from "../../../homeassistant-frontend/src/panels/lovelace/common/handle-action";
import {
  LovelaceCard,
  LovelaceCardEditor,
} from "../../../homeassistant-frontend/src/panels/lovelace/types";
import { HomeAssistant } from "../../../homeassistant-frontend/src/types";
import { registerCustomCard } from "../../utils/register-card";
import { MORE_INFO_CARD_EDITOR_NAME, MORE_INFO_CARD_NAME } from "./const";
import { MoreInfoCardConfig } from "./more-info-card-config";

registerCustomCard({
  name: "Rounded more info card",
  type: MORE_INFO_CARD_NAME,
  description: "Open more info modal window of a specified entity",
});

@customElement(MORE_INFO_CARD_NAME)
export class MoreInfoCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: MoreInfoCardConfig;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./more-info-card-editor");
    return document.createElement(
      MORE_INFO_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static async getStubConfig(
    _hass: HomeAssistant
  ): Promise<MoreInfoCardConfig> {
    const entities = Object.keys(_hass.states);
    return {
      type: `custom:${MORE_INFO_CARD_NAME}`,
      entity: entities[0],
    };
  }

  public getCardSize(): number {
    return 1;
  }

  public setConfig(config: MoreInfoCardConfig): void {
    this._config = {
      tap_action: {
        action: "more-info",
      },
      ...config,
    };
  }

  private _handleAction(ev: ActionHandlerEvent) {
    handleAction(this, this.hass!, this._config!, ev.detail.action!);
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    return html` <ha-card>
      <div @action=${this._handleAction}>More information</div>
    </ha-card>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      ha-card {
        background: none;
        border-radius: 24px;
        color: var(--contrast20);
        margin-top: 8px;
        padding: 18px 0px;
        font-size: 16px;
        border: 2px solid var(--contrast5);
        text-align: center;
      }
    `;
  }
}
