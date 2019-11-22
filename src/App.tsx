import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import { withRouter } from 'react-router';
import Table from './components/Table';
import Editor from './components/Editor';
import './app.css';

const App = (props: any) => (
  <>
    <Header {...props} />
    <Route path="/:target" component={Table} />
    <Route path="/:target/:id">
      <Editor />
    </Route>
  </>
);

// export default withRouter(App);
export default App;
