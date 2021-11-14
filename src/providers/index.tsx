import { PropsWithChildren } from 'react';
import IntlProvider from './IntlProvider';
import QueryProvider from './QueryProvider';
import RouterProvider from './RouterProvider';

function AppProviders({ children }: PropsWithChildren<{}>) {
  return (
    <IntlProvider>
      <RouterProvider>
        <QueryProvider>{children}</QueryProvider>
      </RouterProvider>
    </IntlProvider>
  );
}

export default AppProviders;
