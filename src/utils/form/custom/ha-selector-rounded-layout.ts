import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { fireEvent, HomeAssistant } from "../../../ha";
import "../../../shared/editor/layout-picker";

export type RoundedLayoutSelector = {
    "mush-layout": {};
};

@customElement("ha-selector-mush-layout")
export class HaRoundedLayoutSelector extends LitElement {
    @property() public hass!: HomeAssistant;

    @property() public selector!: RoundedLayoutSelector;

    @property() public value?: string;

    @property() public label?: string;

    protected render() {
        return html`
            <rounded-layout-picker
                .hass=${this.hass}
                .label=${this.label}
                .value=${this.value}
                @value-changed=${this._valueChanged}
            ></rounded-layout-picker>
        `;
    }

    private _valueChanged(ev: CustomEvent) {
        fireEvent(this, "value-changed", { value: ev.detail.value || undefined });
    }
}
