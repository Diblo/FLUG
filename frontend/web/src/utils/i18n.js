import i18n from "i18next"

import translationDA from "../locales/da.json"

const resources = {
  da: {
    translation: translationDA,
  },
}

i18n.init({
  resources,
  fallbackLng: "da",

  interpolation: {
    escapeValue: false, // React already does escaping
  },
})

export default i18n
export { t as text, changeLanguage } from "i18next"
