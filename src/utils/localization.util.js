export const getLocaleText = (locale, key) => {
    let locales;

    try {
        locales = require(`../assets/localization/${locale.toString().toLowerCase()}.json`);
    } catch (ex) {
        locales = require('../assets/localization/en-us.json');
    }

    return locales[key];
}