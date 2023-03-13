import { object, optional } from "superstruct";
import { ActionConfig, actionConfigStruct, LocalizeFunc } from "../../ha";
import { HaFormSchema } from "../../utils/form/ha-form";
import { UiAction } from "../../utils/form/ha-selector";

export const actionsSharedConfigStruct = object({
    tap_action: optional(actionConfigStruct),
    hold_action: optional(actionConfigStruct),
    double_tap_action: optional(actionConfigStruct),
});

export type ActionsSharedConfig = {
    tap_action?: ActionConfig;
    hold_action?: ActionConfig;
    double_tap_action?: ActionConfig;
};

export const computeActionsFormSchema = (
    localize: LocalizeFunc,
    actions?: UiAction[]
): HaFormSchema[] => [
    {
        name: "",
        type: "expandable",
        title: localize(`editor.form.section.actions`),
        icon: "mdi:gesture-tap",
        schema: [
            {
                name: "tap_action",
                selector: { "ui-action": { actions } },
            },
            {
                name: "hold_action",
                selector: { "ui-action": { actions } },
            },
            {
                name: "double_tap_action",
                selector: { "ui-action": { actions } },
            },
        ],
    },
];
