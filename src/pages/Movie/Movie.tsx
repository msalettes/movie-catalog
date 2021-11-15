import React, { ComponentProps } from 'react';
import { Image } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ContentItem from '../../components/ContentItem/ContentItem';
import Loading from '../../components/Loading';
import { SupportedLocale } from '../../intl';
import fetchMovie from '../../queries/fetch-movie';
import { MovieDetails } from '../../types';
import styles from './Movie.module.scss';

export default function Movie(): JSX.Element {
  const { movieId = '' } = useParams();
  const { locale } = useIntl();
  const { data } = useQuery<MovieDetails, Error>(['movie', movieId, locale], () =>
    fetchMovie(movieId, locale as SupportedLocale).then((res) => res.json()),
  );
  return (
    <>
      <Helmet>
        <title>{data?.title}</title>
      </Helmet>
      <React.Suspense fallback={<Loading />}>
        <div className="bg-secondary bg-gradient text-white">
          <div className="container d-flex flex-row py-4">
            <div>
              <Image src={`https://image.tmdb.org/t/p/w300${data?.poster_path}`} alt="" rounded />
            </div>
            <div className="px-4">
              <div className="d-flex flex-row align-items-center">
                <h1>
                  {data?.title}{' '}
                  <span>
                    (<FormattedDate value={data?.release_date} year="numeric" />)
                  </span>
                </h1>
                <div className=""></div>
              </div>
              <div>
                <span>{data?.genres.map((genre) => genre.name).join(' / ')}</span> - <span>{data?.runtime}m</span>
              </div>
              <h2 className="mt-3">
                <FormattedMessage id="movie.synopsis" />
              </h2>
              {data?.overview}
              <h4 className="mt-3">Rating</h4>
              <div>
                <span className="">{data?.vote_average}</span>/<span>10</span>
              </div>
            </div>
          </div>
        </div>
      </React.Suspense>
      <div className="container pt-3">
        <h2>
          <FormattedMessage id="movie.similar" />
        </h2>
        <div className={`d-flex flex-row justify-content-start align-items-stretch ${styles.similars}`}>
          {data?.similar.results.map((similarMovie) => {
            const contentItemProps: ComponentProps<typeof ContentItem> = {
              title: similarMovie.title,
              picturePath: similarMovie.backdrop_path,
              overview: similarMovie.overview,
              releaseDate: similarMovie.release_date,
              url: `/movies/${similarMovie.id}`,
            };
            return <ContentItem key={similarMovie.id} {...contentItemProps} className={styles.similar} />;
          })}
        </div>
      </div>
    </>
  );
}
