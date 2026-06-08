import React from 'react';
import './Settings.css';

interface Props {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const Settings: React.FC<Props> = ({ darkMode, setDarkMode }) => {
  return (
    <div className="settings-bar">
      <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
};

export default Settings;