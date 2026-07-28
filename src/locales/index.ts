import en from './en';
import hi from './hi';
import te from './te';

export type LanguageCode = 'en' | 'hi' | 'te';

export const locales: Record<LanguageCode, Record<string, string>> = {
  en,
  hi,
  te,
};
