import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { fireEvent, HomeAssistant } from "../../../ha";
import "../../../shared/editor/info-picker";
import { Info } from "../../info";

export type RoundedInfoSelector = {
    "rounded-info": {
        infos?: Info[];
    };
};

@customElement("ha-selector-rounded-info")
export class HaRoundedInfoSelector extends LitElement {
    @property() public hass!: HomeAssistant;

    @property() public selector!: RoundedInfoSelector;

    @property() public value?: string;

    @property() public label?: string;

    protected render() {
        return html`
            <rounded-info-picker
                .hass=${this.hass}
                .infos=${this.selector["rounded-info"].infos}
                .label=${this.label}
                .value=${this.value}
                @value-changed=${this._valueChanged}
            ></rounded-info-picker>
        `;
    }

    private _valueChanged(ev: CustomEvent) {
        fireEvent(this, "value-changed", { value: ev.detail.value || undefined });
    }
}
