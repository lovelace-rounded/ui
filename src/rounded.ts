import { version } from "../package.json";
import "./utils/form/custom/ha-selector-rounded-alignment";
import "./utils/form/custom/ha-selector-rounded-color";
import "./utils/form/custom/ha-selector-rounded-icon-type";
import "./utils/form/custom/ha-selector-rounded-info";
import "./utils/form/custom/ha-selector-rounded-layout";

export { TitleCard } from "./cards/title-card/title-card";
export { MoreInfoCard } from "./cards/more-info-card/more-info-card";
export { SceneCard } from "./cards/scene-card/scene-card";

console.info(`%c 📍 Rounded 📍 - ${version}`, "color: #ef5350; font-weight: 700;");
