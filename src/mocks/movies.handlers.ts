import { rest } from 'msw';
import allMoviesPage1 from './fixtures/get-all-movies-page-1.json';
import movieDetails from './fixtures/get-movie-details.json';

export const moviesHandlers = [
  rest.get('https://api.themoviedb.org/3/discover/movie', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(allMoviesPage1));
  }),
  rest.get('https://api.themoviedb.org/3/movie/*', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(movieDetails));
  }),
];
