import { HassEntity } from "home-assistant-js-websocket";
import { html, TemplateResult } from "lit";
import { computeStateDisplay, HomeAssistant, isActive, isAvailable } from "../ha";
import "../shared/badge-icon";
import "../shared/card";
import { Appearance } from "../shared/config/appearance-config";
import "../shared/shape-avatar";
import "../shared/shape-icon";
import "../shared/state-info";
import "../shared/state-item";
import { RoundedBaseElement } from "./base-element";
import { computeInfoDisplay } from "./info";

export function computeDarkMode(hass?: HomeAssistant): boolean {
    if (!hass) return false;
    return (hass.themes as any).darkMode as boolean;
}
export class RoundedBaseCard extends RoundedBaseElement {
    protected renderPicture(picture: string): TemplateResult {
        return html`
            <rounded-shape-avatar
                slot="icon"
                .picture_url=${(this.hass as any).hassUrl(picture)}
            ></rounded-shape-avatar>
        `;
    }

    protected renderIcon(entity: HassEntity, icon: string): TemplateResult {
        const active = isActive(entity);
        return html`
            <rounded-shape-icon slot="icon" .disabled=${!active} .icon=${icon}></rounded-shape-icon>
        `;
    }

    protected renderBadge(entity: HassEntity): TemplateResult | null {
        const unavailable = !isAvailable(entity);
        return unavailable
            ? html`
                  <rounded-badge-icon
                      class="unavailable"
                      slot="badge"
                      icon="mdi:help"
                  ></rounded-badge-icon>
              `
            : null;
    }

    protected renderStateInfo(
        entity: HassEntity,
        appearance: Appearance,
        name: string,
        state?: string
    ): TemplateResult | null {
        const defaultState = computeStateDisplay(
            this.hass.localize,
            entity,
            this.hass.locale,
            this.hass.entities
        );
        const displayState = state ?? defaultState;

        const primary = computeInfoDisplay(
            appearance.primary_info,
            name,
            displayState,
            entity,
            this.hass
        );

        const secondary = computeInfoDisplay(
            appearance.secondary_info,
            name,
            displayState,
            entity,
            this.hass
        );

        return html`
            <rounded-state-info
                slot="info"
                .primary=${primary}
                .secondary=${secondary}
            ></rounded-state-info>
        `;
    }
}
