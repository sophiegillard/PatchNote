import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { DateTime } from 'luxon';
import translationEN from "../../assets/locales/en/common.json";
import translationFR from "../../assets/locales/fr/common.json";
import translationNL from "../../assets/locales/nl/common.json";


const resources = {
    EN: {
        translation: translationEN
    },
    FR: {
        translation: translationFR
    },
    NL: {
        translation: translationNL
    }
};

i18n

    .use(Backend)
    /*// detect user language
    .use(LanguageDetector)*/
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    .init({
        resources,
        debug: true,
        fallbackLng: 'FR',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        react: { wait: true, useSuspense: false }});

// new usage
i18n.services.formatter.add('DATE_HUGE', (value, lng, options) => {
    return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
});

export default i18n;