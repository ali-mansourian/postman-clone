import React from 'react';
import { KeyValuePair } from '../types';
import './KeyValueEditor.css';

interface Props {
  pairs: KeyValuePair[];
  onChange: (newPairs: KeyValuePair[]) => void;
}

const KeyValueEditor: React.FC<Props> = ({ pairs, onChange }) => {
  const updatePair = (index: number, field: keyof KeyValuePair, value: string) => {
    const newPairs = [...pairs];
    newPairs[index][field] = value;
    onChange(newPairs);
  };

  const addPair = () => {
    onChange([...pairs, { key: '', value: '' }]);
  };

  const removePair = (index: number) => {
    const newPairs = pairs.filter((_, i) => i !== index);
    onChange(newPairs);
  };

  return (
    <div className="kv-editor">
      {pairs.map((pair, idx) => (
        <div key={idx} className="kv-row">
          <input
            type="text"
            placeholder="Key"
            value={pair.key}
            onChange={(e) => updatePair(idx, 'key', e.target.value)}
          />
          <span>:</span>
          <input
            type="text"
            placeholder="Value"
            value={pair.value}
            onChange={(e) => updatePair(idx, 'value', e.target.value)}
          />
          <button onClick={() => removePair(idx)} className="remove-btn">✕</button>
        </div>
      ))}
      <button onClick={addPair} className="add-btn">+ Add</button>
    </div>
  );
};

export default KeyValueEditor;