import { UnsubscribeFunc } from "home-assistant-js-websocket";
import { CSSResultGroup, html, nothing, css, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators";
import { TITLE_CARD_EDITOR_NAME, TITLE_CARD_NAME } from "./const";
import { TitleCardConfig } from "./title-card-config";
import { RenderTemplateResult, subscribeRenderTemplate } from "../../ha/data/ws-templates";
import { registerCustomCard } from "../../utils/custom-cards";
import {
    actionHandler,
    ActionHandlerEvent,
    handleAction,
    hasAction,
    HomeAssistant,
    LovelaceCard,
    LovelaceCardEditor,
} from "../../ha";
import { RoundedBaseElement } from "../../utils/base-element";
import { computeRgbColor } from "../../utils/colors";
import { styleMap } from "lit/directives/style-map";

registerCustomCard({
    name: "Rounded title card",
    type: TITLE_CARD_NAME,
    description: "Card with title and entity chip sub section",
});

const TEMPLATE_KEYS = ["title"] as const;
type TemplateKey = typeof TEMPLATE_KEYS[number];

@customElement(TITLE_CARD_NAME)
export class TitleCard extends RoundedBaseElement implements LovelaceCard {
    @state() private _config?: TitleCardConfig;

    @state() private _templateResults: Partial<
        Record<TemplateKey, RenderTemplateResult | undefined>
    > = {};

    @state() private _unsubRenderTemplates: Map<TemplateKey, Promise<UnsubscribeFunc>> = new Map();

    public static async getConfigElement(): Promise<LovelaceCardEditor> {
        await import("./title-card-editor");
        return document.createElement(TITLE_CARD_EDITOR_NAME) as LovelaceCardEditor;
    }

    public static async getStubConfig(_hass: HomeAssistant): Promise<TitleCardConfig> {
        return {
            type: `custom:${TITLE_CARD_NAME}`,
            title: "Hello, {{ user }} !",
            pill: {},
        };
    }

    getCardSize(): number | Promise<number> {
        return 1;
    }

    public setConfig(config: TitleCardConfig): void {
        TEMPLATE_KEYS.forEach((key) => {
            if (this._config?.[key] !== config[key] || this._config?.entity != config.entity) {
                this._tryDisconnectKey(key);
            }
        });

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

    public isTemplate(key: TemplateKey) {
        const value = this._config?.[key];
        return value?.includes("{");
    }

    private getValue(key: TemplateKey) {
        return this.isTemplate(key) ? this._templateResults[key]?.result : this._config?.[key];
    }

    private _handleAction(ev: ActionHandlerEvent) {
        handleAction(this, this.hass!, this._config!, ev.detail.action!);
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

        const title = this.getValue("title");

        return html` <ha-card
            @action=${this._handleAction}
            .actionHandler=${actionHandler({
                hasHold: hasAction(this._config.hold_action),
                hasDoubleClick: hasAction(this._config.double_tap_action),
            })}
        >
            <h1 class="title" style=${styleMap(textStyle)}>${title}</h1>
        </ha-card>`;
    }

    protected updated(changedProps: PropertyValues): void {
        super.updated(changedProps);
        if (!this._config || !this.hass) {
            return;
        }

        this._tryConnect();
    }

    private async _tryConnect(): Promise<void> {
        TEMPLATE_KEYS.forEach((key) => {
            this._tryConnectKey(key);
        });
    }

    private async _tryConnectKey(key: TemplateKey): Promise<void> {
        if (
            this._unsubRenderTemplates.get(key) !== undefined ||
            !this.hass ||
            !this._config ||
            !this.isTemplate(key)
        ) {
            return;
        }

        try {
            const sub = subscribeRenderTemplate(
                this.hass.connection,
                (result) => {
                    this._templateResults = {
                        ...this._templateResults,
                        [key]: result,
                    };
                },
                {
                    template: this._config[key] ?? "",
                    entity_ids: this._config.entity_id,
                    variables: {
                        config: this._config,
                        user: this.hass.user!.name,
                        entity: this._config.entity,
                    },
                    strict: true,
                }
            );
            this._unsubRenderTemplates.set(key, sub);
            await sub;
        } catch (_err) {
            const result = {
                result: this._config[key] ?? "",
                listeners: {
                    all: false,
                    domains: [],
                    entities: [],
                    time: false,
                },
            };
            this._templateResults = {
                ...this._templateResults,
                [key]: result,
            };
            this._unsubRenderTemplates.delete(key);
        }
    }
    private async _tryDisconnect(): Promise<void> {
        TEMPLATE_KEYS.forEach((key) => {
            this._tryDisconnectKey(key);
        });
    }

    private async _tryDisconnectKey(key: TemplateKey): Promise<void> {
        const unsubRenderTemplate = this._unsubRenderTemplates.get(key);
        if (!unsubRenderTemplate) {
            return;
        }

        try {
            const unsub = await unsubRenderTemplate;
            unsub();
            this._unsubRenderTemplates.delete(key);
        } catch (err: any) {
            if (err.code === "not_found" || err.code === "template_error") {
                // If we get here, the connection was probably already closed. Ignore.
            } else {
                throw err;
            }
        }
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

                h1.title {
                    font-size: 32px;
                    color: var(--text-color);
                }
            `,
        ];
    }
}
