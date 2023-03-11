import { assert } from "superstruct";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators";
import { TITLE_CARD_EDITOR_NAME } from "./const";
import { TitleCardConfig, titleCardConfigStruct } from "./title-card-config";
import { fireEvent, HomeAssistant, LovelaceCardEditor } from "../../ha";
import memoizeOne from "memoize-one";
import { HaFormSchema } from "../../utils/form/ha-form";
import setupCustomlocalize from "../../localize";
import { GENERIC_LABELS } from "../../utils/form/generic-fields";

const computeSchema = memoizeOne((): HaFormSchema[] => [
    { name: "title", required: true, selector: { template: {} } },
    { name: "color", selector: { "mush-color": {} } },
    {
        name: "tap_action",
        selector: {
            "ui-action": {},
        },
    },
]);

@customElement(TITLE_CARD_EDITOR_NAME)
export class TitleCardEditor extends LitElement implements LovelaceCardEditor {
    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private _config?: TitleCardConfig;

    public setConfig(config: TitleCardConfig): void {
        assert(config, titleCardConfigStruct);
        this._config = config;
    }

    private _valueChanged(ev: CustomEvent): void {
        fireEvent(this, "config-changed", { config: ev.detail.value });
    }

    private _computeLabel = (schema: HaFormSchema) => {
        const customLocalize = setupCustomlocalize(this.hass!);

        if (GENERIC_LABELS.includes(schema.name)) {
            return customLocalize(`editor.card.generic.${schema.name}`);
        }

        return this.hass!.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
    };

    protected render() {
        if (!this.hass || !this._config) {
            return nothing;
        }

        const schema = computeSchema();

        return html`<ha-form
            .hass=${this.hass}
            .data=${this._config}
            .schema=${schema}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._valueChanged}
        ></ha-form>`;
    }

    static get styles() {
        return [
            css`
                .container {
                    display: flex;
                    flex-direction: column;
                }
                ha-form {
                    display: block;
                    margin-bottom: 24px;
                }
            `,
        ];
    }
}
