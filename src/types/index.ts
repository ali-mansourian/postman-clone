export interface KeyValuePair {
  key: string;
  value: string;
}

export interface RequestData {
  method: string;
  url: string;
  params: KeyValuePair[];
  headers: KeyValuePair[];
  body: string;
  name?: string; // for saved requests
}

export interface RequestTab {
  id: string;
  name: string;
  request: RequestData;
}

export interface Collection {
  name: string;
  requests: RequestData[];
}