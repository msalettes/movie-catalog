import { SupportedLocale } from '../intl';
import { contentLanguage } from '../types';

export default async function fetchMovie(movieId: string, language: SupportedLocale) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=92b418e837b833be308bbfb1fb2aca1e&language=${contentLanguage[language]}&append_to_response=similar`,
  );
}
