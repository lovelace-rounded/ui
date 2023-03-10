import { assert } from "superstruct";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { LovelaceCardEditor } from "../../../homeassistant-frontend/src/panels/lovelace/types";
import { HomeAssistant } from "../../../homeassistant-frontend/src/types";
import { TITLE_CARD_EDITOR_NAME } from "./const";
import { TitleCardConfig, titleCardConfigStruct } from "./title-card-config";
import { configElementStyle } from "../../../homeassistant-frontend/src/panels/lovelace/editor/config-elements/config-elements-style";
import { LocalizeFunc } from "../../../homeassistant-frontend/src/common/translations/localize";
import memoizeOne from "memoize-one";
import { SchemaUnion } from "../../../homeassistant-frontend/src/components/ha-form/types";
import { fireEvent } from "../../../homeassistant-frontend/src/common/dom/fire_event";

@customElement(TITLE_CARD_EDITOR_NAME)
export class TitleCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: TitleCardConfig;

  public setConfig(config: TitleCardConfig): void {
    assert(config, titleCardConfigStruct);
    this._config = config;
  }

  private _schema = memoizeOne((localize: LocalizeFunc) => [
    { name: "title", required: true, selector: {  template: {} },
    { name: "color", selector: { "ui-color": {} } },
    {
      name: "tap_action",
      selector: {
        "ui-action": {},
      },
    },
  ]);

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }

    const config: TitleCardConfig = {
      features: this._config.features,
      ...ev.detail.value,
    };
    fireEvent(this, "config-changed", { config });
  }

  private _computeLabelCallback = (schema: SchemaUnion<ReturnType<typeof this._schema>>) => {
    switch (schema.name) {
      case "color":
        return this.hass!.localize(`ui.panel.lovelace.editor.card.tile.${schema.name}`);

      default:
        return this.hass!.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
    }
  };

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    const schema = this._schema(this.hass!.localize);

    return html` <ha-form
      .hass=${this.hass}
      .data=${this._config}
      .schema=${schema}
      .computeLabel=${this._computeLabelCallback}
      @value-changed=${this._valueChanged}
    ></ha-form>`;
  }

  static get styles() {
    return [
      configElementStyle,
      css`
        .container {
          display: flex;
          flex-direction: column;
        }
        ha-form {
          display: block;
          margin-bottom: 24px;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "rounded-title-card-editor": TitleCardEditor;
  }
}