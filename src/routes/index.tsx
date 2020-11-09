import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import IncidenteRoute from './IncidenteRoute';

type Props = {
  onMenuClick: () => void;
};

class MainRoute extends React.Component<Props> {
  render(): JSX.Element {
    const { onMenuClick } = this.props;
    return (
      <Switch>
        <Route path="/incidente">
          <IncidenteRoute onMenuClick={onMenuClick} />
        </Route>
        <Route path="/">
          <Redirect to="/incidente" />
        </Route>
      </Switch>
    );
  }
}

export default MainRoute;
