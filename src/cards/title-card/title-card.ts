import { UnsubscribeFunc } from "home-assistant-js-websocket";
import { CSSResultGroup, html, LitElement, nothing, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  RenderTemplateResult,
  subscribeRenderTemplate,
} from "../../../homeassistant-frontend/src/data/ws-templates";
import {
  LovelaceCard,
  LovelaceCardEditor,
} from "../../../homeassistant-frontend/src/panels/lovelace/types";
import { HomeAssistant } from "../../../homeassistant-frontend/src/types";
import { TITLE_CARD_EDITOR_NAME, TITLE_CARD_NAME } from "./const";
import { TitleCardConfig } from "./title-card-config";

@customElement(TITLE_CARD_NAME)
export class TitleCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: TitleCardConfig;

  @state() private _templateResult?: RenderTemplateResult;

  @state() private _unsubRenderTemplate?: Promise<UnsubscribeFunc>;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./title-card-editor");
    return document.createElement(TITLE_CARD_EDITOR_NAME) as LovelaceCardEditor;
  }

  public static async getStubConfig(
    _hass: HomeAssistant
  ): Promise<TitleCardConfig> {
    return {
      type: `custom:${TITLE_CARD_NAME}`,
      title: "Hello, {{ user }} !",
    };
  }

  public getCardSize(): number {
    return 1;
  }

  public setConfig(config: TitleCardConfig): void {
    this._config = {
      title_tap_action: {
        action: "none",
      },
      subtitle_tap_action: {
        action: "none",
      },
      ...config,
    };
  }

  public connectedCallback() {
    super.connectedCallback();
    this._tryConnect();
  }

  public disconnectedCallback() {
    this._tryDisconnect();
  }

  private async _tryConnect(): Promise<void> {
    if (
      this._unsubRenderTemplate !== undefined ||
      !this.hass ||
      !this._config
    ) {
      return;
    }

    try {
      this._unsubRenderTemplate = subscribeRenderTemplate(
        this.hass.connection,
        (result) => {
          this._templateResult = result;
        },
        {
          template: this._config.title,
          variables: {
            config: this._config,
            user: this.hass.user!.name,
          },
          strict: true,
        }
      );
    } catch (_err) {
      this._templateResult = {
        result: this._config!.title,
        listeners: { all: false, domains: [], entities: [], time: false },
      };
      this._unsubRenderTemplate = undefined;
    }
  }

  private async _tryDisconnect(): Promise<void> {
    if (!this._unsubRenderTemplate) {
      return;
    }

    try {
      const unsub = await this._unsubRenderTemplate;
      unsub();
      this._unsubRenderTemplate = undefined;
    } catch (err: any) {
      if (err.code === "not_found") {
        // If we get here, the connection was probably already closed. Ignore.
      } else {
        throw err;
      }
    }
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    return html` <ha-card>
      <h1 class="title">${this._templateResult?.result}</h1>
    </ha-card>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      ha-card {
        height: 100%;
        background: none;
        text-align: center;
        padding: var(--grid-card-gap) 0px;
        --mdc-ripple-press-opacity: 0;
        display: block;
      }

      div.title {
        font-size: 32px;
        color: var(--contract20);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "rounded-title-card": TitleCard;
  }
}
