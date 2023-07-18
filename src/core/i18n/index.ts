import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"

import { z } from "zod"
import { zodI18nMap } from "zod-i18n-map"
import { makeZodI18nMap } from "zod-i18n-map"

/*
import zodEn from "public/locales/EN/zod.json"
import zodRu from "public/locales/RU/zod.json"
*/

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: "EN",
    /*
    resources: {
      EN: { zod: zodEn },
      RU: { zod: zodRu },
    },
    */
    backend: {
      loadPath: () =>
        (typeof window === "undefined" ? process.env.SITE_URL : "") +
        `/locales/{{lng}}/{{ns}}.json`,
      parse: (data, lng, ns) => JSON.parse(data),
    },
    // interpolation: {
    //   escapeValue: false, // not needed for react as it escapes by default
    // },
  })

// z.setErrorMap(makeZodI18nMap({ ns: ["zod", "custom"] }))

export default i18n
