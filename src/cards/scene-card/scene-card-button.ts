import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { HomeAssistant } from "../../ha";
import { SceneEntity } from "../../ha/data/scene";

@customElement("rounded-scene-card-button")
export class SceneCardButton extends LitElement {
    @property({ attribute: false }) public hass!: HomeAssistant;

    @property({ attribute: false }) public entity!: SceneEntity;

    private _handleClick(e: MouseEvent): void {
        e.stopPropagation();
        const action = (e.target! as any).action as string;
        // handleButtonClick(this.hass, this.scene, action!);
    }

    protected render(): TemplateResult {
        return html`<p>Hello</p>`;
    }
}
