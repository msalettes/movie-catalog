/* eslint-disable react/display-name */
import React, { FunctionComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import translationMessages from '../intl';
interface MockedProviderBuilder {
  withIntlProvider: (locale?: string) => MockedProviderBuilder;
  withContextProvider: <ContextState extends unknown>(
    Context: React.Context<ContextState>,
    value: ContextState,
  ) => MockedProviderBuilder;
  withRouterProvider: (initialEntries: string[]) => MockedProviderBuilder;
  build: () => FunctionComponent<unknown>;
}

const EmptyProvider: FunctionComponent<unknown> = ({ children }) => <>{children}</>;

const mockedProvidersReducer =
  (
    PreviousProvider: FunctionComponent<unknown>,
    CurrentProvider: FunctionComponent<unknown>,
  ): FunctionComponent<unknown> =>
  ({ children }) =>
    (
      <CurrentProvider>
        <PreviousProvider>{children}</PreviousProvider>
      </CurrentProvider>
    );

export function makeMockedProviders(): MockedProviderBuilder {
  const mockedProviders: FunctionComponent<unknown>[] = [];
  const builder: MockedProviderBuilder = {
    withIntlProvider: (locale = 'en') => {
      mockedProviders.push(({ children }) => (
        <IntlProvider locale={locale} messages={translationMessages[locale]}>
          {children}
        </IntlProvider>
      ));
      return builder;
    },
    withContextProvider: <ContextState extends unknown>(Context: React.Context<ContextState>, value: ContextState) => {
      if (Context) {
        mockedProviders.push(({ children }) => <Context.Provider value={value}>{children}</Context.Provider>);
      }
      return builder;
    },
    withRouterProvider: (initialEntries: string[]) => {
      mockedProviders.push(({ children }) => <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>);
      return builder;
    },

    build: () => mockedProviders.reduce(mockedProvidersReducer, EmptyProvider),
  };
  return builder;
}
