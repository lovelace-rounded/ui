import { version } from "../package.json";

export { TitleCard } from "./cards/title-card/title-card";

console.info(
  `%c 📍 Rounded 📍 - ${version}`,
  "color: #ef5350; font-weight: 700;"
);
