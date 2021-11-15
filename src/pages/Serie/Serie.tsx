import React, { ComponentProps } from 'react';
import { Image } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ContentItem from '../../components/ContentItem/ContentItem';
import Loading from '../../components/Loading';
import { SupportedLocale } from '../../intl';
import fetchSerie from '../../queries/fetch-serie';
import { SerieDetails } from '../../types';
import styles from './Serie.module.scss';

export default function Serie(): JSX.Element {
  const { serieId = '' } = useParams();
  const { locale } = useIntl();
  const { data } = useQuery<SerieDetails, Error>(['serie', serieId, locale], () =>
    fetchSerie(serieId, locale as SupportedLocale).then((res) => res.json()),
  );
  return (
    <>
      <Helmet>
        <title>{data?.name}</title>
      </Helmet>
      <React.Suspense fallback={<Loading />}>
        <div className="bg-secondary bg-gradient text-white" data-testid="serie-details">
          <div className="container d-flex flex-row py-4">
            <div>
              <Image src={`https://image.tmdb.org/t/p/w300${data?.poster_path}`} alt="" rounded />
            </div>
            <div className="px-4">
              <div className="d-flex flex-row align-items-center">
                <h1>
                  {data?.name}{' '}
                  <span>
                    (<FormattedDate value={data?.first_air_date} year="numeric" />)
                  </span>
                </h1>
                <div className=""></div>
              </div>
              <div>
                <span>{data?.genres.map((genre) => genre.name).join(' / ')}</span>
              </div>
              <h2 className="mt-3">
                <FormattedMessage id="serie.synopsis" />
              </h2>
              {data?.overview}
              <h4 className="mt-3">Rating</h4>
              <div>{data?.vote_average}/10</div>
            </div>
          </div>
        </div>
      </React.Suspense>
      <div className="container pt-3">
        <h2>
          <FormattedMessage id="serie.similar" />
        </h2>
        <div className={`d-flex flex-row justify-content-start align-items-stretch ${styles.similars}`}>
          {data?.similar.results.map((similarMovie) => {
            const contentItemProps: ComponentProps<typeof ContentItem> = {
              title: similarMovie.name,
              picturePath: similarMovie.backdrop_path,
              overview: similarMovie.overview,
              releaseDate: similarMovie.first_air_date,
              url: `/series/${similarMovie.id}`,
            };
            return <ContentItem key={similarMovie.id} {...contentItemProps} className={styles.similar} />;
          })}
        </div>
      </div>
    </>
  );
}
