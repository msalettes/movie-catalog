import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router';
import AppLayout from './components/AppLayout';
import { ErrorFallback } from './components/Error/Error';
import Loading from './components/Loading';
import Providers from './providers';
const Movies = React.lazy(() => import('./pages/Movies'));
const Movie = React.lazy(() => import('./pages/Movie'));
const Series = React.lazy(() => import('./pages/Series'));
const Serie = React.lazy(() => import('./pages/Serie'));
const NotFound = React.lazy(() => import('./pages/404'));

function App() {
  return (
    <Providers>
      <AppLayout>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/series/:serieId" element={<Serie />} />
              <Route path="/movies/:movieId" element={<Movie />} />
              <Route path="*" element={<NotFound />} />
              {/* PLOP_INJECT_ROUTE */}
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </AppLayout>
    </Providers>
  );
}

export default App;
