import React from 'react';

import { Container } from './styled';
import AppBar from 'components/AppBar';

type Props = {};

class ConfiguracoesRoute extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Container>
        <AppBar title="Configurações" />
      </Container>
    );
  }
}

export default ConfiguracoesRoute;
