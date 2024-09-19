import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import Backend from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"

import translationEN from "./assets/translations/EN/translations_EN.json"
import translationFR from "./assets/translations/FR/translations_FR.json"

const resources = {
	en: {
		translation: translationEN,
	},
	fr: {
		translation: translationFR,
	},
}

i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "en",
		debug: true,
		interpolation: {
			escapeValue: false,
		},
	})

export default i18n

