import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import de from "./locale/de.json";
import en from "./locale/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: { ...en },
      },
      de: {
        translation: { ...de },
      },
    },
    fallbackLng: "en",
    lng: "en",
    detection: {
      order: ["path", "localStorage", "htmlTag", "cookie"],
      caches: ["localStorage", "cookie"], // cache user language on
    },
    debug: true,
  });
