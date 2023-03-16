import { assert } from "superstruct";
import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators";
import { TITLE_CARD_EDITOR_NAME } from "./const";
import { TitleCardConfig, titleCardConfigStruct } from "./title-card-config";
import { fireEvent, LocalizeFunc, LovelaceCardEditor } from "../../ha";
import memoizeOne from "memoize-one";
import { HaFormSchema } from "../../utils/form/ha-form";
import setupCustomlocalize from "../../localize";
import { GENERIC_LABELS } from "../../utils/form/generic-fields";
import { computeActionsFormSchema } from "../../shared/config/actions-config";
import { loadHaComponents } from "../../utils/loader";
import { RoundedBaseElement } from "../../utils/base-element";

const computeSchema = memoizeOne((localize: LocalizeFunc): HaFormSchema[] => [
    { name: "title", required: true, selector: { template: {} } },
    { name: "text_color", selector: { "rounded-color": {} } },
    ...computeActionsFormSchema(localize),
]);

@customElement(TITLE_CARD_EDITOR_NAME)
export class TitleCardEditor extends RoundedBaseElement implements LovelaceCardEditor {
    @state() private _config?: TitleCardConfig;

    connectedCallback() {
        super.connectedCallback();
        void loadHaComponents();
    }

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

        const schema = computeSchema(this.hass!.localize);

        return html`<ha-form
            .hass=${this.hass}
            .data=${this._config}
            .schema=${schema}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._valueChanged}
        ></ha-form> `;
    }
}
