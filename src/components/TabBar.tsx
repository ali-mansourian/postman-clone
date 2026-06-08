import React, { useState } from 'react';
import { RequestTab } from '../types';
import './TabBar.css';

interface Props {
  tabs: RequestTab[];
  activeId: string;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
  onRename: (id: string, newName: string) => void;
  onAdd: () => void;
}

const TabBar: React.FC<Props> = ({ tabs, activeId, onSelect, onClose, onRename, onAdd }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleDoubleClick = (tab: RequestTab) => {
    setEditingId(tab.id);
    setEditName(tab.name);
  };

  const handleRenameSubmit = (id: string) => {
    if (editName.trim()) {
      onRename(id, editName.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="tab-bar">
      <div className="tabs-container">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab ${activeId === tab.id ? 'active' : ''}`}
            onClick={() => onSelect(tab.id)}
            onDoubleClick={() => handleDoubleClick(tab)}
          >
            {editingId === tab.id ? (
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={() => handleRenameSubmit(tab.id)}
                onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit(tab.id)}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span>{tab.name}</span>
            )}
            <button
              className="close-btn"
              onClick={(e) => {
                e.stopPropagation();
                onClose(tab.id);
              }}
            >
              ✕
            </button>
          </div>
        ))}
        <button className="add-tab-btn" onClick={onAdd}>
          + New Tab
        </button>
      </div>
    </div>
  );
};

export default TabBar;