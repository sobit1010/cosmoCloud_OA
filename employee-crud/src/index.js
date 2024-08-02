// first

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import global styles if needed
import App from './App';

// Create a root container to render the app
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
