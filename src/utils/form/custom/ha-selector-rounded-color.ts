import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { fireEvent, HomeAssistant } from "../../../ha";
import "../../../shared/editor/color-picker";

export type RoundedColorSelector = {
    "rounded-color": {};
};

@customElement("ha-selector-rounded-color")
export class HaRoundedColorSelector extends LitElement {
    @property() public hass!: HomeAssistant;

    @property() public selector!: RoundedColorSelector;

    @property() public value?: string;

    @property() public label?: string;

    protected render() {
        return html`
            <rounded-color-picker
                .hass=${this.hass}
                .label=${this.label}
                .value=${this.value}
                @value-changed=${this._valueChanged}
            ></rounded-color-picker>
        `;
    }

    private _valueChanged(ev: CustomEvent) {
        fireEvent(this, "value-changed", { value: ev.detail.value || undefined });
    }
}
