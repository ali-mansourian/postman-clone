import React, { useEffect } from 'react';
import { RequestData } from '../types';
import KeyValueEditor from './KeyValueEditor';
import RawBodyEditor from './RawBodyEditor';
import './RequestPanel.css';

interface Props {
  request: RequestData;
  onChange: (updates: Partial<RequestData>) => void;
  onSend: () => void;
  onClear: () => void;
  loading: boolean;
}

/** Build a full URL from a base URL and query parameters. */
const buildUrlFromParams = (baseUrl: string, params: RequestData['params']): string => {
  // Extract the part before '?' to use as the base
  const [base] = baseUrl.split('?');
  const searchParams = new URLSearchParams();
  params.forEach(p => {
    if (p.key.trim()) {
      searchParams.append(p.key, p.value);
    }
  });
  const qs = searchParams.toString();
  return qs ? `${base}?${qs}` : base;
};

const RequestPanel: React.FC<Props> = ({ request, onChange, onSend, onClear, loading }) => {
  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  // Auto‑update URL when query parameters change
  useEffect(() => {
    const newUrl = buildUrlFromParams(request.url, request.params);
    if (newUrl !== request.url) {
      onChange({ url: newUrl });
    }
  }, [request.params]); // eslint-disable-line react-hooks/exhaustive-deps
  // Intentionally omit request.url from deps to avoid loops;
  // updating the URL here won't trigger another effect.

  return (
    <div className="request-panel">
      <div className="url-bar">
        <select
          value={request.method}
          onChange={(e) => onChange({ method: e.target.value })}
          className="method-select"
        >
          {methods.map(m => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <input
          type="text"
          value={request.url}
          onChange={(e) => onChange({ url: e.target.value })}
          placeholder="https://api.example.com/endpoint"
          className="url-input"
        />
        <button onClick={onSend} disabled={loading} className="send-btn">
          {loading ? 'Sending...' : 'Send'}
        </button>
        <button onClick={onClear} className="clear-btn">
          Clear All
        </button>
      </div>

      <div className="request-sections">
        <div className="section">
          <h3>Query Parameters</h3>
          <KeyValueEditor
            pairs={request.params}
            onChange={(newParams) => onChange({ params: newParams })}
          />
        </div>

        <div className="section">
          <h3>Headers</h3>
          <KeyValueEditor
            pairs={request.headers}
            onChange={(newHeaders) => onChange({ headers: newHeaders })}
          />
        </div>

        <div className="section">
          <h3>Body (Raw Text / JSON)</h3>
          <RawBodyEditor
            value={request.body}
            onChange={(newBody) => onChange({ body: newBody })}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestPanel;