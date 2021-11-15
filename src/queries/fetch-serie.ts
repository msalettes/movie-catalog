import { SupportedLocale } from '../intl';
import { contentLanguage } from '../types';

export default async function fetchSerie(tvId: string, language: SupportedLocale) {
  return fetch(
    `https://api.themoviedb.org/3/tv/${tvId}?api_key=92b418e837b833be308bbfb1fb2aca1e&language=${contentLanguage[language]}&append_to_response=similar`,
  );
}
