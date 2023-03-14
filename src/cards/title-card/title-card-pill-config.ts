import { object, optional, string } from "superstruct";
import { Info } from "../../utils/info";

export type TitleCardPillConfig = {
    entity?: string;
    text_color?: string;
    background_color?: string;
    primary_info?: Info;
    secondary_info?: Info;
};

export const titleCardPillConfigStruct = object({
    entity: optional(string()),
    text_color: optional(string()),
    background_color: optional(string()),
    primary_info: optional(string()),
    secondary_info: optional(string()),
});
