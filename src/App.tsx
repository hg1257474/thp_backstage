import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import { withRouter } from 'react-router';
import Table from './components/Table';
import Editor from './components/Editor';
import './app.css';

const App = (props: any) => (
  <>
    <Header {...props} />
    <Switch>
      <Route path="/:target/:id">
        <Editor />
      </Route>
      <Route path="/:target" component={Table} />
    </Switch>
  </>
);

// export default withRouter(App);
export default App;
