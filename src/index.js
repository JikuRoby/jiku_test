import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App'; // Import your main React component
import './App.css'; // Import your external CSS file

const root = createRoot(document.getElementById('root')); // Create a root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
