import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { Appearance } from "./config/appearance-config";
import "./shape-icon";

@customElement("rounded-state-item")
export class StateItem extends LitElement {
    @property() public appearance?: Appearance;

    protected render(): TemplateResult {
        return html`
            <div
                class=${classMap({
                    container: true,
                })}
            >
                ${this.appearance?.icon_type !== "none"
                    ? html`
                          <div class="icon">
                              <slot name="icon"></slot>
                              <slot name="badge"></slot>
                          </div>
                      `
                    : null}
                ${this.appearance?.primary_info !== "none" ||
                this.appearance?.secondary_info !== "none"
                    ? html`
                          <div class="info">
                              <slot name="info"></slot>
                          </div>
                      `
                    : null}
            </div>
        `;
    }

    static get styles(): CSSResultGroup {
        return css`
            .container {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
            }
            .container > *:not(:last-child) {
                margin-right: var(--spacing);
            }
            :host([rtl]) .container > *:not(:last-child) {
                margin-right: initial;
                margin-left: var(--spacing);
            }
            .icon {
                position: relative;
            }
            .icon ::slotted(*[slot="badge"]) {
                position: absolute;
                top: -3px;
                right: -3px;
            }
            :host([rtl]) .icon ::slotted(*[slot="badge"]) {
                right: initial;
                left: -3px;
            }
            .info {
                min-width: 0;
                width: 100%;
                display: flex;
                flex-direction: column;
            }
            .container.vertical {
                flex-direction: column;
            }
            .container.vertical > *:not(:last-child) {
                margin-bottom: var(--spacing);
                margin-right: 0;
                margin-left: 0;
            }
            :host([rtl]) .container.vertical > *:not(:last-child) {
                margin-right: initial;
                margin-left: initial;
            }
            .container.vertical .info {
                text-align: center;
            }
        `;
    }
}
