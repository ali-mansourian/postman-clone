import React from 'react';
import './ResponsePanel.css';

interface Props {
  response: { status: number | null; body: string; error: string | null };
  loading: boolean;
}

const ResponsePanel: React.FC<Props> = ({ response, loading }) => {
  return (
    <div className="response-panel">
      <div className="response-header">
        <h3>Response</h3>
        {response.status && (
          <span className={`status-code status-${Math.floor(response.status / 100)}00`}>
            Status: {response.status}
          </span>
        )}
      </div>
      <div className="response-body">
        {loading && <div className="loading">Sending request...</div>}
        {response.error && <pre className="error">{response.error}</pre>}
        {!loading && !response.error && (
          <pre>{response.body || '(No response body)'}</pre>
        )}
      </div>
    </div>
  );
};

export default ResponsePanel;