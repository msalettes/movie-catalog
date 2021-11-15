import { render, screen, waitFor, within } from '@testing-library/react';
import React from 'react';
import { makeMockedProviders } from '../../helpers/provider-builder';
import Movie from './Movie';

describe('<Movie/>', () => {
  const providers = makeMockedProviders()
    .withQueryProvider()
    .withIntlProvider()
    .withRouterProvider(['/movies/580489'])
    .build();

  test('should render details of movie (title, genres, synopsis, rating)', async () => {
    render(<Movie />, { wrapper: providers });
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /Venom: Let There Be Carnage/i })).toBeInTheDocument();
    });
    const movieDetails = screen.getByTestId('movie-details');
    expect(movieDetails).toBeInTheDocument();
    expect(within(movieDetails).getByText('Science Fiction / Action / Adventure')).toBeInTheDocument();
    expect(screen.getByText('6.8/10')).toBeInTheDocument();
  });
});
