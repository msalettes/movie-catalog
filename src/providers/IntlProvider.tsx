import { Fragment, PropsWithChildren, useState } from 'react';
import { Helmet } from 'react-helmet';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import translationMessages, { defaultLanguage, SupportedLocale } from '../intl';
export default function IntlProvider({ children }: PropsWithChildren<{}>) {
  const [locale] = useState<SupportedLocale>(() => {
    let lang = navigator.language.toLowerCase().split(/[_-]+/)[0];
    // if not supported, falls back to EN language
    if (!Object.keys(translationMessages).includes(lang.toLowerCase())) {
      lang = defaultLanguage;
    }
    return lang as SupportedLocale;
  });

  return (
    <>
      <Helmet>
        <html lang={locale} />
      </Helmet>
      <ReactIntlProvider locale={locale} messages={translationMessages[locale]} textComponent={Fragment}>
        {children}
      </ReactIntlProvider>
    </>
  );
}
