import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';

import MapRoute from './MapRoute';
import HomeRoute from './HomeRoute';
import ProductsRoute from './ProductsRoute';

const history = createHashHistory({ hashType: 'hashbang' });

class MainRoute extends React.Component {
  render(): JSX.Element {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/map" component={MapRoute} />
          <Route path="/home" component={HomeRoute} />
          <Route path="/products" component={ProductsRoute} />
          <Route path="/" component={MapRoute} />
        </Switch>
      </Router>
    );
  }
}

export default MainRoute;
