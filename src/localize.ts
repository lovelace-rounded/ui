import { HomeAssistant } from "./ha";
import * as en from "./translations/en.json";
import * as fr from "./translations/fr.json";

const languages: Record<string, unknown> = {
    en,
    fr,
};

const DEFAULT_LANG = "en";

function getTranslatedString(key: string, lang: string): string | undefined {
    try {
        return key
            .split(".")
            .reduce((o, i) => (o as Record<string, unknown>)[i], languages[lang]) as string;
    } catch (_) {
        return undefined;
    }
}

export function localize(key: string): string {
    const lang = (localStorage.getItem("selectedLanguage") || "en")
        .replace(/['"]+/g, "")
        .replace("-", "_");

    let translated = getTranslatedString(key, lang);
    if (!translated) translated = getTranslatedString(key, DEFAULT_LANG);
    return translated ?? key;
}

export default function setupCustomlocalize(hass?: HomeAssistant) {
    return function (key: string) {
        const lang = hass?.locale.language ?? DEFAULT_LANG;

        let translated = getTranslatedString(key, lang);
        if (!translated) translated = getTranslatedString(key, DEFAULT_LANG);
        return translated ?? key;
    };
}
