import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

interface LoadingProps {
  delay?: number;
}

function Loading({ delay = 300 }: LoadingProps) {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const tid = setTimeout(() => setShowSpinner(true), delay);
    return () => clearTimeout(tid);
  }, [delay]);

  if (!showSpinner) {
    return null;
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">
          <FormattedMessage id="loading" />
        </span>
      </div>
    </div>
  );
}

export default Loading;
