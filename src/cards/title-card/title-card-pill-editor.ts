import { LovelaceCardEditor } from "../../ha";
import { RoundedBaseElement } from "../../utils/base-element";
import { TITLE_CARD_PILL_EDITOR_NAME } from "./const";
import { TitleCardPillConfig } from "./title-card-config";

@customElement(TITLE_CARD_PILL_EDITOR_NAME)
export class TitleCardPillEditor extends RoundedBaseElement implements LovelaceCardEditor {
    @state() private _config?: TitleCardPillConfig;
}
