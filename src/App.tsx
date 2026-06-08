import React, { useState, useEffect } from 'react';
import TabBar from './components/TabBar';
import RequestPanel from './components/RequestPanel';
import ResponsePanel from './components/ResponsePanel';
import CollectionsSidebar from './components/CollectionsSidebar';
import Settings from './components/Settings';
import { useLocalStorage } from './hooks/useLocalStorage';
import { RequestTab, Collection, RequestData } from './types';
import { sendHttpRequest } from './utils/httpClient';
import './App.css';

const App: React.FC = () => {
  const createEmptyRequest = (): RequestData => ({
    method: 'GET',
    url: '',
    params: [{ key: '', value: '' }],
    headers: [{ key: '', value: '' }],
    body: '',
  });

  const [tabs, setTabs] = useLocalStorage<RequestTab[]>('api-client-tabs', [
    { id: '1', name: 'Tab 1', request: createEmptyRequest() },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id || '1');
  const [collections, setCollections] = useLocalStorage<Collection[]>('api-client-collections', []);
  const [history, setHistory] = useLocalStorage<RequestData[]>('api-client-history', []);
  const [response, setResponse] = useState<{ status: number | null; body: string; error: string | null }>({
    status: null,
    body: '',
    error: null,
  });
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('dark-mode', false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const getActiveTab = () => tabs.find((t: RequestTab) => t.id === activeTabId);

  const updateActiveTab = (updates: Partial<RequestTab>) => {
    setTabs((prev: RequestTab[]) =>
      prev.map((t: RequestTab) => (t.id === activeTabId ? { ...t, ...updates } : t))
    );
  };

  const updateActiveRequest = (updates: Partial<RequestData>) => {
    const active = getActiveTab();
    if (active) {
      updateActiveTab({ request: { ...active.request, ...updates } });
    }
  };

  const addTab = () => {
    const newId = Date.now().toString();
    const newTab: RequestTab = {
      id: newId,
      name: `Tab ${tabs.length + 1}`,
      request: createEmptyRequest(),
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
  };

  const closeTab = (id: string) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter((t: RequestTab) => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[0].id);
    }
  };

  const renameTab = (id: string, newName: string) => {
    setTabs((prev: RequestTab[]) =>
      prev.map((t: RequestTab) => (t.id === id ? { ...t, name: newName } : t))
    );
  };

  const handleSendRequest = async () => {
    const activeTab = getActiveTab();
    if (!activeTab) return;
    const req = activeTab.request;

    if (!req.url.trim()) {
      setResponse({ status: null, body: '', error: 'URL cannot be empty' });
      return;
    }
    try {
      const parsed = new URL(req.url);
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        setResponse({ status: null, body: '', error: 'Only HTTP and HTTPS URLs are allowed' });
        return;
      }
    } catch {
      setResponse({ status: null, body: '', error: 'Invalid URL format' });
      return;
    }

    setHistory((prev: RequestData[]) => [req, ...prev].slice(0, 100));

    setLoading(true);
    setResponse({ status: null, body: '', error: null });

    try {
      const result = await sendHttpRequest(req);
      setResponse({ status: result.status, body: result.data, error: null });
    } catch (err: any) {
      setResponse({ status: null, body: '', error: err.message || 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  const clearAllFields = () => {
    updateActiveRequest(createEmptyRequest());
  };

  const saveCurrentToCollection = (collectionName: string) => {
    const activeTab = getActiveTab();
    if (!activeTab) return;
    const newRequest = { ...activeTab.request, name: activeTab.name };
    setCollections((prev: Collection[]) => {
      const existing = prev.find((c: Collection) => c.name === collectionName);
      if (existing) {
        return prev.map((c: Collection) =>
          c.name === collectionName
            ? { ...c, requests: [...c.requests, newRequest] }
            : c
        );
      } else {
        return [...prev, { name: collectionName, requests: [newRequest] }];
      }
    });
  };

  const deleteRequestFromCollection = (collectionName: string, requestIndex: number) => {
    setCollections((prev: Collection[]) =>
      prev.map((c: Collection) =>
        c.name === collectionName
          ? { ...c, requests: c.requests.filter((_, i) => i !== requestIndex) }
          : c
      )
    );
  };

  const deleteCollection = (collectionName: string) => {
    setCollections((prev: Collection[]) => prev.filter((c: Collection) => c.name !== collectionName));
  };

  const loadRequestFromCollection = (request: RequestData) => {
    updateActiveRequest(request);
  };

  const loadHistoryRequest = (request: RequestData) => {
    updateActiveRequest(request);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const exportCollections = () => {
    const dataStr = JSON.stringify(collections, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'collections.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importCollections = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (Array.isArray(imported)) {
          setCollections(imported);
        } else {
          alert('Invalid collections file');
        }
      } catch {
        alert('Invalid JSON');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="app">
      <CollectionsSidebar
        collections={collections}
        history={history}
        onSaveCurrent={saveCurrentToCollection}
        onLoadRequest={loadRequestFromCollection}
        onLoadHistory={loadHistoryRequest}
        onDeleteRequest={deleteRequestFromCollection}
        onDeleteCollection={deleteCollection}
        onClearHistory={clearHistory}
        onExport={exportCollections}
        onImport={importCollections}
      />
      <div className="main-area">
        <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
        <TabBar
          tabs={tabs}
          activeId={activeTabId}
          onSelect={setActiveTabId}
          onClose={closeTab}
          onRename={renameTab}
          onAdd={addTab}
        />
        {getActiveTab() && (
          <RequestPanel
            request={getActiveTab()!.request}
            onChange={updateActiveRequest}
            onSend={handleSendRequest}
            onClear={clearAllFields}
            loading={loading}
          />
        )}
        <ResponsePanel response={response} loading={loading} />
      </div>
    </div>
  );
};

export default App;