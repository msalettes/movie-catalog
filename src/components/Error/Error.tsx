import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { FormattedMessage } from 'react-intl';
type ErrorStatus = '404' | '500';

interface ErrorProps {
  status: ErrorStatus;
  error?: Error;
  callBack?: () => void;
}
export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps): JSX.Element {
  return <ErrorComponent status="500" error={error} callBack={resetErrorBoundary} />;
}
export default function ErrorComponent({ status, error, callBack }: ErrorProps): JSX.Element {
  return (
    <div className="container">
      <div className="row justify-content-center" role="alert">
        <div className="col-md-12 col-sm-12">
          <div className="card shadow-lg border-0 rounded-lg mt-5 mx-auto" style={{ width: '30rem;' }}>
            <h3 className="card-header display-1 text-muted text-center">{status}</h3>

            <div className="card-subtitle mb-2 text-muted text-center p-3">
              {status === '404' ? (
                <FormattedMessage id="errors.404" />
              ) : (
                <>
                  <FormattedMessage id="errors.500" />: {error && error.message}
                </>
              )}
            </div>
            {callBack && (
              <div className="card-body mx-auto">
                <button className="btn btn-sm btn-info text-white" onClick={callBack}>
                  <FormattedMessage id="errors.retry-button-label" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
