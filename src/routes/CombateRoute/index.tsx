import React from 'react';

import { Container } from './styled';
import AppBar from 'components/AppBar';

type Props = {};

class CombateRoute extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Container>
        <AppBar title="Registro de Combate" />
      </Container>
    );
  }
}

export default CombateRoute;
