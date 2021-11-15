import { render, screen, waitFor, within } from '@testing-library/react';
import React from 'react';
import { makeMockedProviders } from '../../helpers/provider-builder';
import Serie from './Serie';

describe('<Serie/>', () => {
  const providers = makeMockedProviders()
    .withQueryProvider()
    .withIntlProvider()
    .withRouterProvider(['/Series/93405'])
    .build();

  test('should render details of Serie (title, genres, synopsis, rating)', async () => {
    render(<Serie />, { wrapper: providers });
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /Squid Game/i })).toBeInTheDocument();
    });
    const serieDetails = screen.getByTestId('serie-details');
    expect(serieDetails).toBeInTheDocument();
    expect(within(serieDetails).getByText('Action & Adventure / Mystery / Drama')).toBeInTheDocument();
    expect(screen.getByText('7.8/10')).toBeInTheDocument();
  });
});
