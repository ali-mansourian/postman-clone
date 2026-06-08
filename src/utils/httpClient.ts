import { RequestData, KeyValuePair } from '../types';

function buildUrlWithParams(baseUrl: string, params: KeyValuePair[]): string {
  const url = new URL(baseUrl);
  params.forEach(p => {
    if (p.key.trim()) {
      url.searchParams.append(p.key, p.value);
    }
  });
  return url.toString();
}

function buildHeaders(headers: KeyValuePair[]): Record<string, string> {
  const obj: Record<string, string> = {};
  headers.forEach(h => {
    if (h.key.trim()) {
      obj[h.key] = h.value;
    }
  });
  return obj;
}

export async function sendHttpRequest(req: RequestData): Promise<{ status: number; data: string }> {
  const finalUrl = buildUrlWithParams(req.url, req.params);
  const headers = buildHeaders(req.headers);

  const fetchOptions: RequestInit = {
    method: req.method,
    headers,
  };

  // Attach body if the method supports it and body is non‑empty.
  // We do NOT automatically set Content‑Type; the user controls that via headers.
  if (req.method !== 'GET' && req.method !== 'HEAD' && req.body.trim()) {
    fetchOptions.body = req.body;
  }

  const response = await fetch(finalUrl, fetchOptions);
  const text = await response.text();
  return { status: response.status, data: text };
}