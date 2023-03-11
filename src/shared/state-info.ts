import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("rounded-state-info")
export class StateItem extends LitElement {
    @property() public primary: string = "";

    @property() public secondary?: string;

    @property() public multiline_secondary?: boolean = false;

    protected render(): TemplateResult {
        return html`
            <div class="container">
                <span class="primary">${this.primary}</span>
                ${this.secondary
                    ? html`<span
                          class="secondary${this.multiline_secondary ? ` multiline_secondary` : ``}"
                          >${this.secondary}</span
                      >`
                    : null}
            </div>
        `;
    }

    static get styles(): CSSResultGroup {
        return css`
            .container {
                min-width: 0;
                flex: 1;
                display: flex;
                flex-direction: column;
            }
            .primary {
                font-weight: var(--card-primary-font-weight);
                font-size: var(--card-primary-font-size);
                line-height: var(--card-primary-line-height);
                color: var(--primary-text-color);
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .secondary {
                font-weight: var(--card-secondary-font-weight);
                font-size: var(--card-secondary-font-size);
                line-height: var(--card-secondary-line-height);
                color: var(--secondary-text-color);
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .multiline_secondary {
                white-space: pre-wrap;
            }
        `;
    }
}
