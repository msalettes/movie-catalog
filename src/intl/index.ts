import en from './en.messages';
import { flatten } from './flatten';
import fr from './fr.messages';

export const defaultLanguage = 'en';

export type SupportedLocale = 'en' | 'fr';

const translationMessages: Record<string, Record<string, string>> = {
  en: flatten(en),
  fr: flatten(fr),
};
export default translationMessages;
