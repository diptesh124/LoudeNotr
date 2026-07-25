import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Fallback implementation for window.storage using localStorage
if (!window.storage) {
  window.storage = {
    async get(key, shared) {
      const val = localStorage.getItem(key);
      return val ? { value: val } : null;
    },
    async set(key, value, shared) {
      localStorage.setItem(key, value);
      return true;
    },
    async delete(key, shared) {
      localStorage.removeItem(key);
      return true;
    },
    async list(prefix, shared) {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(prefix)) {
          keys.push(k);
        }
      }
      return { keys };
    }
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
