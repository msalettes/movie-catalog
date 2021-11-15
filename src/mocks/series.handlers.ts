import { rest } from 'msw';
import serieDetails from './fixtures/get-serie-details.json';

export const seriesHandlers = [
  rest.get('https://api.themoviedb.org/3/tv/*', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(serieDetails));
  }),
];
