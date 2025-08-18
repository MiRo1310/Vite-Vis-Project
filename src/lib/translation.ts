import { TranslationObj } from "@/types/types";
import { translationObject } from "@/config/text";
import { Path } from "@/types/types";

type Parameter = Record<string, string | number | boolean | undefined>;

export const translation = (text: Path<typeof translationObject>, obj?: Parameter): string => {
  const translated = text.split(".").reduce<TranslationObj | string | undefined>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return acc[key]; // Weiter in die nächste Verschachtelung navigieren
    }
    return undefined;
  }, translationObject);

  return typeof translated === "string" ? setTranslationValue(translated, obj) : text;
};

const setTranslationValue = (translation: string, obj?: Parameter): string => {
  if (!obj) return translation;

  const params = Object.entries(obj);
  if (params.length === 0) return translation;

  params.forEach(([key, value]) => {
    translation = translation.replace(`{${key}}`, value?.toString() ?? "");
  });
  return translation;
};
