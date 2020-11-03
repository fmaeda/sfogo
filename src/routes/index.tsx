import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';

import HomeRoute from './HomeRoute';
import ProductsRoute from './ProductsRoute';

const history = createHashHistory({ hashType: 'hashbang' });

class MainRoute extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/home" component={HomeRoute} />
          <Route path="/products" component={ProductsRoute} />
          <Route path="/" component={HomeRoute} />
        </Switch>
      </Router>
    );
  }
}

export default MainRoute;
