import { documentation } from "../../package.json";

interface RegisterCardParams {
    type: string;
    name: string;
    description: string;
}
export function registerCustomCard(params: RegisterCardParams) {
    const windowWithCards = window as unknown as Window & {
        customCards: unknown[];
    };
    windowWithCards.customCards = windowWithCards.customCards || [];

    const cardPage = params.type.replace("-card", "").replace("rounded-", "");
    windowWithCards.customCards.push({
        ...params,
        preview: true,
        documentationURL: `${documentation.url}/blob/main/docs/cards/${cardPage}.md`,
    });
}
