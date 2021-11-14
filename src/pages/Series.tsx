import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import ContentList from '../components/ContentList/ContentList';
import { SortBy } from '../types';
import styles from './Movies.module.scss';

export default function Series(): JSX.Element {
  const { formatMessage } = useIntl();
  const [sortBy, setSortBy] = useState<SortBy>('popularity.desc');

  const handleSortByChange = React.useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSortBy(event.target.value as SortBy);
    },
    [setSortBy],
  );
  return (
    <>
      <Helmet>
        <title>{formatMessage({ id: 'series.title' })}</title>
      </Helmet>
      <div className="d-flex flex-row justify-content-between px-5 pt-5">
        <h1>
          <FormattedMessage id="series.title" />
        </h1>
        <div className="d-flex align-items-center flex-row justify-content-end pb-4 pr-4 w-20">
          <div className={classNames('mr-1', styles.sortbylabel)}>
            <FormattedMessage id="sortBy.title" />
          </div>
          <Form.Select as="select" onChange={handleSortByChange} value={sortBy}>
            <option value="popularity.desc">{formatMessage({ id: 'sortBy.popularity.desc' })}</option>
            <option value="release.desc">{formatMessage({ id: 'sortBy.release.desc' })}</option>
            <option value="name.asc">{formatMessage({ id: 'sortBy.original_title.asc' })}</option>
            <option value="vote_average.desc">{formatMessage({ id: 'sortBy.vote_average.desc' })}</option>
          </Form.Select>
        </div>
      </div>
      <ContentList contentType="tv" sortBy={sortBy} />
    </>
  );
}
