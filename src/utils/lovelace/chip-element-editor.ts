import { customElement } from "lit/decorators.js";
import { computeChipComponentName } from "./chip/chip-element";
import { LovelaceChipConfig } from "./chip/types";
import { RoundedElementEditor } from "./element-editor";
import { LovelaceChipEditor } from "./types";

@customElement("rounded-chip-element-editor")
export class RoundedChipElementEditor extends RoundedElementEditor<LovelaceChipConfig> {
    protected get configElementType(): string | undefined {
        return this.value?.type;
    }

    protected async getConfigElement(): Promise<LovelaceChipEditor | undefined> {
        const elClass = (await getChipElementClass(this.configElementType!)) as any;

        // Check if a GUI editor exists
        if (elClass && elClass.getConfigElement) {
            return elClass.getConfigElement();
        }

        return undefined;
    }
}

export const getChipElementClass = (type: string) =>
    customElements.get(computeChipComponentName(type));
