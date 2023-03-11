import { fireEvent, HomeAssistant } from "../../../ha";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../../shared/editor/icon-type-picker";

export type RoundedIconTypeSelector = {
    "mush-icon-type": {};
};

@customElement("ha-selector-mush-icon-type")
export class HaRoundedIconTypeSelector extends LitElement {
    @property() public hass!: HomeAssistant;

    @property() public selector!: RoundedIconTypeSelector;

    @property() public value?: string;

    @property() public label?: string;

    protected render() {
        return html`
            <rounded-icon-type-picker
                .hass=${this.hass}
                .label=${this.label}
                .value=${this.value}
                @value-changed=${this._valueChanged}
            ></rounded-icon-type-picker>
        `;
    }

    private _valueChanged(ev: CustomEvent) {
        fireEvent(this, "value-changed", { value: ev.detail.value || undefined });
    }
}
