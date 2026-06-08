import React from 'react';
import './RawBodyEditor.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const RawBodyEditor: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="raw-body-editor">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Enter raw body (text or JSON) ...'
        rows={8}
      />
    </div>
  );
};

export default RawBodyEditor;