import { UnsubscribeFunc } from "home-assistant-js-websocket";
import { CSSResultGroup, html, nothing, css } from "lit";
import { customElement, state } from "lit/decorators";
import { TITLE_CARD_EDITOR_NAME, TITLE_CARD_NAME } from "./const";
import { TitleCardConfig } from "./title-card-config";
import { RenderTemplateResult, subscribeRenderTemplate } from "../../ha/data/ws-templates";
import { registerCustomCard } from "../../utils/custom-cards";
import { HomeAssistant, LovelaceCard, LovelaceCardEditor } from "../../ha";
import { RoundedBaseElement } from "../../utils/base-element";
import { computeRgbColor } from "../../utils/colors";
import { styleMap } from "lit/directives/style-map";

registerCustomCard({
    name: "Rounded title card",
    type: TITLE_CARD_NAME,
    description: "Card with title and entity chip sub section",
});

@customElement(TITLE_CARD_NAME)
export class TitleCard extends RoundedBaseElement implements LovelaceCard {
    @state() private _config?: TitleCardConfig;

    @state() private _templateResult?: RenderTemplateResult;

    @state() private _unsubRenderTemplate?: Promise<UnsubscribeFunc>;

    public static async getConfigElement(): Promise<LovelaceCardEditor> {
        await import("./title-card-editor");
        return document.createElement(TITLE_CARD_EDITOR_NAME) as LovelaceCardEditor;
    }

    public static async getStubConfig(_hass: HomeAssistant): Promise<TitleCardConfig> {
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
            tap_action: {
                action: "more-info",
            },
            hold_action: {
                action: "more-info",
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
        if (this._unsubRenderTemplate !== undefined || !this.hass || !this._config) {
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

        const textStyle = {};

        if (this._config.text_color) {
            const textRgbColor = computeRgbColor(this._config.text_color);
            textStyle["--text-color"] = `rgb(${textRgbColor})`;
        } else {
            textStyle["--text-color"] = `var(--contract20)`;
        }

        return html` <ha-card>
            <h1 class="title" style=${styleMap(textStyle)}>${this._templateResult?.result}</h1>
        </ha-card>`;
    }

    static get styles(): CSSResultGroup {
        return [
            super.styles,
            css`
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
                    --text-color: rgb(var(--contract20));
                }
            `,
        ];
    }
}
