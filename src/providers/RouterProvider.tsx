import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

export default function RouteProvider({ children }: PropsWithChildren<{}>) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
