import React from 'react';
import App from './App';
import { render } from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import 'core-js/stable';
import '@babel/runtime/regenerator';
render(
  <BrowserRouter basename="/admin">
    <App />
  </BrowserRouter>,
  document.querySelector('#root')
);
