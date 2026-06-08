import React, { useState } from 'react';
import { Collection, RequestData } from '../types';
import './CollectionsSidebar.css';

interface Props {
  collections: Collection[];
  history: RequestData[];
  onSaveCurrent: (collectionName: string) => void;
  onLoadRequest: (request: RequestData) => void;
  onLoadHistory: (request: RequestData) => void;
  onDeleteRequest: (collectionName: string, requestIndex: number) => void;
  onDeleteCollection: (collectionName: string) => void;
  onClearHistory: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

const CollectionsSidebar: React.FC<Props> = ({
  collections,
  history,
  onSaveCurrent,
  onLoadRequest,
  onLoadHistory,
  onDeleteRequest,
  onDeleteCollection,
  onClearHistory,
  onExport,
  onImport,
}) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [expandedCollections, setExpandedCollections] = useState<Set<string>>(new Set());

  const toggleExpand = (name: string) => {
    const newSet = new Set(expandedCollections);
    if (newSet.has(name)) newSet.delete(name);
    else newSet.add(name);
    setExpandedCollections(newSet);
  };

  const handleSave = () => {
    if (newCollectionName.trim()) {
      onSaveCurrent(newCollectionName.trim());
      setNewCollectionName('');
      setShowSaveDialog(false);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImport(e.target.files[0]);
    }
  };

  const formatHistoryItem = (req: RequestData) => {
    const shortUrl = req.url.length > 50 ? req.url.substring(0, 47) + '...' : req.url;
    return `${req.method} ${shortUrl}`;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Collections</h3>
        <div className="sidebar-buttons">
          <button onClick={() => setShowSaveDialog(true)}>💾 Save Current</button>
          <button onClick={onExport}>📤 Export</button>
          <label className="import-label">
            📥 Import
            <input type="file" accept=".json" onChange={handleImport} hidden />
          </label>
        </div>
      </div>

      {showSaveDialog && (
        <div className="save-dialog">
          <input
            type="text"
            placeholder="Collection name"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setShowSaveDialog(false)}>Cancel</button>
        </div>
      )}

      <div className="collections-list">
        {collections.map(coll => (
          <div key={coll.name} className="collection-item">
            <div className="collection-header">
              <div className="collection-title" onClick={() => toggleExpand(coll.name)}>
                <span className="toggle-icon">{expandedCollections.has(coll.name) ? '▼' : '▶'}</span>
                <strong>{coll.name}</strong>
              </div>
              <button
                className="delete-collection-btn"
                onClick={() => onDeleteCollection(coll.name)}
                title="Delete collection"
              >
                🗑️
              </button>
            </div>
            {expandedCollections.has(coll.name) && (
              <div className="requests-list">
                {coll.requests.map((req, idx) => (
                  <div key={idx} className="request-item-container">
                    <div
                      className="request-item"
                      onClick={() => onLoadRequest(req)}
                    >
                      {req.name || `${req.method} ${req.url.substring(0, 40)}`}
                    </div>
                    <button
                      className="delete-request-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteRequest(coll.name, idx);
                      }}
                      title="Delete request"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="history-section">
        <div className="history-header">
          <h3>History</h3>
          {history.length > 0 && (
            <button className="clear-history-btn" onClick={onClearHistory}>
              Clear
            </button>
          )}
        </div>
        <div className="history-list">
          {history.map((req, idx) => (
            <div
              key={idx}
              className="history-item"
              onClick={() => onLoadHistory(req)}
            >
              {formatHistoryItem(req)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsSidebar;