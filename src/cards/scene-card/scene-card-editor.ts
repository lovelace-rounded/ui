import { nothing, html } from "lit";
import { customElement, state } from "lit/decorators";
import memoizeOne from "memoize-one";
import { assert } from "superstruct";
import { fireEvent, LovelaceCardEditor } from "../../ha";
import setupCustomlocalize from "../../localize";
import { RoundedBaseElement } from "../../utils/base-element";
import { GENERIC_LABELS } from "../../utils/form/generic-fields";
import { HaFormSchema } from "../../utils/form/ha-form";
import { SCENE_CARD_EDITOR_NAME } from "./const";
import { SceneCardConfig, sceneCardConfigStruct } from "./scene-card-config";

const computeSchema = memoizeOne((): HaFormSchema[] => []);

customElement(SCENE_CARD_EDITOR_NAME);
export class SceneCardEditor extends RoundedBaseElement implements LovelaceCardEditor {
    @state() private _config?: SceneCardConfig;

    public setConfig(config: SceneCardConfig): void {
        assert(config, sceneCardConfigStruct);
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
