import ReactDOM from 'react-dom/client';
import React from 'react';
import './styles/tailwind.css';

import App from './App';

const mountNode = document.getElementById('root');
const root = ReactDOM.createRoot(mountNode);

root.render(
  <App />
);