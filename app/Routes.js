import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import MainPage from './containers/MainPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.MAIN} component={MainPage} />
    </Switch>
  </App>
);
