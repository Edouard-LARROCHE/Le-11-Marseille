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

const getStoredLanguage = () => {
	const storedLang = localStorage.getItem("i18nextLng")
	if (!storedLang) {
		localStorage.setItem("i18nextLng", "fr")

		return "fr"
	}
	return storedLang
}

i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		lng: getStoredLanguage(),
		fallbackLng: "fr",
		debug: false,
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"],
		},
	})

export default i18n

