import React from 'react';
import Login from './login';
import { BrowserRouter } from 'react-router-dom';
import { withRouter } from 'react-router';

const App = (props: any) => <Login {...props} />;

export default withRouter(Login);
