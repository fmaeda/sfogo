import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import IncidenteRoute from './IncidenteRoute';
import ConfiguracoesRoute from './ConfiguracoesRoute';
import CombateRoute from './CombateRoute';
import MapTest from './MapTest';
import { menuRoutes, Menu } from 'model/menu';

type Props = {};

class MainRoute extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Switch>
        <Route path="/mapTest" component={MapTest} />
        <Route path={menuRoutes[Menu.INCIDENTE]} component={IncidenteRoute} />
        <Route path={menuRoutes[Menu.COMBATE]}>
          <CombateRoute />
        </Route>
        <Route path={menuRoutes[Menu.CONFIGURACOES]}>
          <ConfiguracoesRoute />
        </Route>
        <Route path="/">
          <Redirect to={menuRoutes[Menu.INCIDENTE]} />
        </Route>
      </Switch>
    );
  }
}

export default MainRoute;
