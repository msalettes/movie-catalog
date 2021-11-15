import { setupServer } from 'msw/node';
import { moviesHandlers } from './movies.handlers';
import { seriesHandlers } from './series.handlers';
export const server = setupServer(...moviesHandlers, ...seriesHandlers);
