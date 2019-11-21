import React from 'react';
import App from './App';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'core-js/stable';
import '@babel/runtime/regenerator';
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#root')
);
