import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import { assert } from "superstruct";
import { fireEvent, LovelaceCardEditor } from "../../ha";
import setupCustomlocalize from "../../localize";
import { computeActionsFormSchema } from "../../shared/config/actions-config";
import { RoundedBaseElement } from "../../utils/base-element";
import { GENERIC_LABELS } from "../../utils/form/generic-fields";
import { HaFormSchema } from "../../utils/form/ha-form";
import { UiAction } from "../../utils/form/ha-selector";
import { MORE_INFO_CARD_EDITOR_NAME } from "./const";
import { MoreInfoCardConfig, moreInfoCardConfigStruct } from "./more-info-card-config";

const actions: UiAction[] = ["more-info", "navigate", "url", "call-service", "none"];

const computeSchema = memoizeOne((): HaFormSchema[] => [
    { name: "entity", selector: { entity: {} } },
    ...computeActionsFormSchema(actions),
]);

@customElement(MORE_INFO_CARD_EDITOR_NAME)
export class MoreInfoCardEditor extends RoundedBaseElement implements LovelaceCardEditor {
    @state() private _config?: MoreInfoCardConfig;

    public setConfig(config: MoreInfoCardConfig): void {
        assert(config, moreInfoCardConfigStruct);
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

        return html` <ha-form
            .hass=${this.hass}
            .data=${this._config}
            .schema=${schema}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._valueChanged}
        ></ha-form>`;
    }
}
