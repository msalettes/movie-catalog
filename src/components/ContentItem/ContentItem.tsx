import React, { HTMLAttributes } from 'react';
import { Card } from 'react-bootstrap';
import { FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';
import styles from './ContentItem.module.scss';

interface Props extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  title: string;
  releaseDate: string;
  picturePath: string;
  overview: string;
  url: string;
}

const NO_PICTURE_PATH = '/no-image-found.png';
export default function ContentItem({
  title,
  releaseDate,
  picturePath: pictureUrl,
  overview,
  url,
  ...htmlAttributes
}: Props): JSX.Element {
  return (
    <Card {...htmlAttributes}>
      <Link to={url} className={styles.link}>
        <Card.Img variant="top" src={pictureUrl ? `https://image.tmdb.org/t/p/w300${pictureUrl}` : NO_PICTURE_PATH} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>
            <FormattedDate value={releaseDate}></FormattedDate>
          </Card.Subtitle>
          <Card.Text className={styles.overview}>{overview}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}
