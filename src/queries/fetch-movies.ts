import { SupportedLocale } from '../intl';
import { contentLanguage, ContentType, SortBy } from '../types';

export default async function fetchContents(
  contentType: ContentType,
  language: SupportedLocale,
  page: number = 1,
  sortBy: SortBy = 'popularity.desc',
) {
  return fetch(
    `https://api.themoviedb.org/3/discover/${contentType}?api_key=92b418e837b833be308bbfb1fb2aca1e&language=${contentLanguage[language]}&sort_by=${sortBy}&page=${page}`,
  );
}
