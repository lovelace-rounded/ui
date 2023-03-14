import { nothing, html, LitElement, CSSResultGroup, css } from "lit";
import { customElement, property } from "lit/decorators";
import { fireEvent, HomeAssistant } from "../../ha";
import { TITLE_CARD_PILL_EDITOR_NAME } from "./const";
import { TitleCardPillConfig } from "./title-card-pill-config";
import { mdiPill } from "@mdi/js";
import { HaFormSchema } from "../../utils/form/ha-form";
import memoizeOne from "memoize-one";
import setupCustomlocalize from "../../localize";
import { GENERIC_LABELS } from "../../utils/form/generic-fields";

const computeSchema = memoizeOne((): HaFormSchema[] => [
    { name: "entity", selector: { entity: {} } },
    { name: "text_color", selector: { "rounded-color": {} } },
    { name: "background_color", selector: { "rounded-color": {} } },
    { name: "primary_info", selector: { "rounded-info": {} } },
    { name: "secondary_info", selector: { "rounded-info": {} } },
]);

declare global {
    interface HASSDomEvents {
        "pill-changed": {
            pill: TitleCardPillConfig;
        };
    }
}

@customElement(TITLE_CARD_PILL_EDITOR_NAME)
export class TitleCardPillEditor extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;

    @property({ attribute: false }) public pill?: TitleCardPillConfig;

    private _computeLabel = (schema: HaFormSchema) => {
        const customLocalize = setupCustomlocalize(this.hass!);

        if (GENERIC_LABELS.includes(schema.name)) {
            return customLocalize(`editor.card.generic.${schema.name}`);
        }

        return this.hass!.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
    };

    private _valueChanged(ev: CustomEvent): void {
        fireEvent(this, "pill-changed", { pill: ev.detail.value });
    }

    protected render() {
        if (!this.hass) {
            return nothing;
        }

        const schema = computeSchema();

        return html`<ha-expansion-panel outlined>
            <h3 slot="header">
                <ha-svg-icon .path=${mdiPill}></ha-svg-icon>
                ${this.hass!.localize("editor.card.title-card.pill")}
            </h3>
            <div class="content">
                <ha-form
                    .hass=${this.hass}
                    .data=${this.pill}
                    .schema=${schema}
                    .computeLabel=${this._computeLabel}
                    @value-changed=${this._valueChanged}
                ></ha-form>
            </div>
        </ha-expansion-panel>`;
    }

    static get styles(): CSSResultGroup {
        return [
            css`
                :host {
                    padding-top: 24px;
                    display: flex !important;
                    flex-direction: column;
                }
                .content {
                    padding: 12px;
                }
                ha-expansion-panel {
                    display: block;
                    --expansion-panel-content-padding: 0;
                    border-radius: 6px;
                }
                h3 {
                    margin: 0;
                    font-size: inherit;
                    font-weight: inherit;
                }
                ha-svg-icon,
                ha-icon {
                    color: var(--secondary-text-color);
                }
            `,
        ];
    }
}
