import React from 'react';
import Login from './login';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import { withRouter } from 'react-router';

const App = (props: any) => (
  <>
    <Header {...props} />
  </>
);

export default withRouter(App);
