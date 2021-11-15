import React, { ComponentProps } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useIntl } from 'react-intl';
import { useInfiniteQuery } from 'react-query';
import { SupportedLocale } from '../../intl';
import fetchContents from '../../queries/fetch-contents';
import { Contents, ContentType, SortBy } from '../../types';
import ContentItem from '../ContentItem/ContentItem';
import Loading from '../Loading';
import styles from './ContentList.module.scss';

interface Props {
  contentType: ContentType;
  sortBy: SortBy;
}

export default function ContentList({ contentType, sortBy }: Props): JSX.Element {
  const { locale } = useIntl();
  const { isLoading, error, data, hasNextPage, fetchNextPage } = useInfiniteQuery<Contents, Error>(
    ['medias', contentType, locale, sortBy],
    ({ pageParam = 1 }) =>
      fetchContents(contentType, locale as SupportedLocale, pageParam, sortBy).then((res) => res.json()),
    {
      getPreviousPageParam: (firstPage) => (firstPage.page > 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page < lastPage.total_pages ? lastPage.page + 1 : false),
    },
  );
  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: !hasNextPage,
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    throw error;
  }
  return (
    <>
      <div className={`mx-0 p-5 ${styles.grid}`}>
        {data?.pages.map((page) => (
          <React.Fragment key={page.page}>
            {page.results.map((content) => {
              const contentItemProps: ComponentProps<typeof ContentItem> = content.name
                ? {
                    title: content.name,
                    picturePath: content.backdrop_path,
                    overview: content.overview,
                    releaseDate: content.first_air_date,
                    url: `/series/${content.id}`,
                  }
                : {
                    title: content.title,
                    picturePath: content.backdrop_path,
                    overview: content.overview,
                    releaseDate: content.release_date,
                    url: `/movies/${content.id}`,
                  };
              return <ContentItem key={content.id} {...contentItemProps} />;
            })}
          </React.Fragment>
        ))}
      </div>
      <div className="py-5" ref={sentryRef}>
        <Loading />
      </div>
    </>
  );
}
