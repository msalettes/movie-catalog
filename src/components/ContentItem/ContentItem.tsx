import React from 'react';
import { Card } from 'react-bootstrap';
import { FormattedDate } from 'react-intl';
import styles from './ContentItem.module.scss';

interface Props {
  title: string;
  releaseDate: string;
  picturePath: string;
  overview: string;
}

const NO_PICTURE_PATH = '/no-image-found.png';
export default function ContentItem({ title, releaseDate, picturePath: pictureUrl, overview }: Props): JSX.Element {
  return (
    <Card>
      <Card.Img variant="top" src={pictureUrl ? `https://image.tmdb.org/t/p/w300${pictureUrl}` : NO_PICTURE_PATH} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>
          <FormattedDate value={releaseDate}></FormattedDate>
        </Card.Subtitle>
        <Card.Text className={styles.overview}>{overview}</Card.Text>
      </Card.Body>
    </Card>
  );
}
