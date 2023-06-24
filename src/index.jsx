import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const main = () => {
  const rootElement = document.createElement('main');
  document.body.appendChild(rootElement);
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

window.addEventListener('load', main);
