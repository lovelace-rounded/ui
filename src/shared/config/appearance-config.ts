import { enums, Infer, object, optional } from "superstruct";
import { HaFormSchema } from "../../utils/form/ha-form";
import { IconType, ICON_TYPES, Info, INFOS } from "../../utils/info";

export const appearanceSharedConfigStruct = object({
    primary_info: optional(enums(INFOS)),
    secondary_info: optional(enums(INFOS)),
    icon_type: optional(enums(ICON_TYPES)),
});

export type AppearanceSharedConfig = Infer<typeof appearanceSharedConfigStruct>;

export type Appearance = {
    primary_info: Info;
    secondary_info: Info;
    icon_type: IconType;
};

export const APPEARANCE_FORM_SCHEMA: HaFormSchema[] = [
    {
        type: "grid",
        name: "",
        schema: [
            { name: "primary_info", selector: { "rounded-info": {} } },
            { name: "secondary_info", selector: { "rounded-info": {} } },
            { name: "icon_type", selector: { "rounded-icon-type": {} } },
        ],
    },
];
