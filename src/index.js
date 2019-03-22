import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App';
import { ContextProvider } from './context';
console.log('slkefj');
ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById('app')
);
