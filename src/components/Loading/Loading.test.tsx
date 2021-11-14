import { act, render, screen } from '@testing-library/react';
import { makeMockedProviders } from '../../helpers/provider-builder';
import Loading from './Loading';


describe('<Loading />', () => {
  it('should not render text before 300ms', () => {
    jest.useFakeTimers();
    const wrapper  = makeMockedProviders().withIntlProvider().build();
    render(<Loading />, { wrapper });
    jest.advanceTimersByTime(299);

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('should render text after 300ms', () => {
    jest.useFakeTimers();
    const wrapper  = makeMockedProviders().withIntlProvider().build();
    render(<Loading />, { wrapper });
    act(() => {
      jest.advanceTimersByTime(301);
    });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
