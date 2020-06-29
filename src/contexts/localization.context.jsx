import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

let language = navigator.language || "en-us";
let localizationData;
let defaultData;
try {
    localizationData = require(`../assets/localization/${language.toLowerCase()}.json`);
    defaultData = require(`../assets/localization/en-us.json`);
} catch (err) {
    localizationData = require(`../assets/localization/en-us.json`);
}

const initialContext = { locale: localizationData, defaultLocale: defaultData };

export const LocalizationContext = React.createContext(initialContext);