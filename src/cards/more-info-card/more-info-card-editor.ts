import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import { assert } from "superstruct";
import { fireEvent } from "../../../homeassistant-frontend/src/common/dom/fire_event";
import { LocalizeFunc } from "../../../homeassistant-frontend/src/common/translations/localize";
import { SchemaUnion } from "../../../homeassistant-frontend/src/components/ha-form/types";
import { configElementStyle } from "../../../homeassistant-frontend/src/panels/lovelace/editor/config-elements/config-elements-style";
import { LovelaceCardEditor } from "../../../homeassistant-frontend/src/panels/lovelace/types";
import { HomeAssistant } from "../../../homeassistant-frontend/src/types";
import { MORE_INFO_CARD_EDITOR_NAME } from "./const";
import {
  MoreInfoCardConfig,
  moreInfoCardConfigStruct,
} from "./more-info-card-config";

@customElement(MORE_INFO_CARD_EDITOR_NAME)
export class MoreInfoCardEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: MoreInfoCardConfig;

  public setConfig(config: MoreInfoCardConfig): void {
    assert(config, moreInfoCardConfigStruct);
    this._config = config;
  }

  private _schema = memoizeOne((_: LocalizeFunc) => [
    { name: "entity", required: true, selector: { entity: {} } },
  ]);

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }

    const config: MoreInfoCardConfig = {
      features: this._config.features,
      ...ev.detail.value,
    };
    fireEvent(this, "config-changed", { config });
  }

  private _computeLabelCallback = (
    schema: SchemaUnion<ReturnType<typeof this._schema>>
  ) => {
    switch (schema.name) {
      default:
        return this.hass!.localize(
          `ui.panel.lovelace.editor.card.generic.${schema.name}`
        );
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
