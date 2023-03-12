import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { fireEvent, HomeAssistant } from "../../../ha";
import "../../../shared/editor/alignment-picker";

export type RoundedAlignementSelector = {
    "rounded-alignment": {};
};

@customElement("ha-selector-rounded-alignment")
export class HaRoundedAlignmentSelector extends LitElement {
    @property() public hass!: HomeAssistant;

    @property() public selector!: RoundedAlignementSelector;

    @property() public value?: string;

    @property() public label?: string;

    protected render() {
        return html`
            <rounded-alignment-picker
                .hass=${this.hass}
                .label=${this.label}
                .value=${this.value}
                @value-changed=${this._valueChanged}
            ></rounded-alignment-picker>
        `;
    }

    private _valueChanged(ev: CustomEvent) {
        fireEvent(this, "value-changed", { value: ev.detail.value || undefined });
    }
}
