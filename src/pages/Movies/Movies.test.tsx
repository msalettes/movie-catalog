import { render, screen } from '@testing-library/react';
import React from 'react';
import { makeMockedProviders } from '../../helpers/provider-builder';
import Movies from './Movies';

describe('<Movies/>', () => {
  const providers = makeMockedProviders().withQueryProvider().withIntlProvider().withRouterProvider(['/']).build();

  test('should render a title with a select for sorting movies', async () => {
    render(<Movies />, { wrapper: providers });
    expect(screen.getByText('Movies')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  // TODO: fix messageParent error to be able to execute this test
  // test('should render a list of movies', async () => {
  //   const intersectionObserver = mockIntersectionObserver();
  //   render(<Movies />, { wrapper: providers });
  //   await waitFor(() => {
  //     expect(screen.getAllByRole('link')).toEqual(20);
  //   });
  // });
});
