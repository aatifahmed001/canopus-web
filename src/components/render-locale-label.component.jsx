import React from 'react';
import { LocalizationContext } from '../contexts';

export const RenderLocaleLabel = ({ localeKey }) => {
    const { locale, default: defaultLocale } = React.useContext(LocalizationContext);
    if (!localeKey) {
        return '';
    }
    return localeKey;
    // return locale[localeKey] || defaultLocale[localeKey];
};