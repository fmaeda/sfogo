import React from 'react';

import MainRoute from 'routes';

import { Container } from './styled';

type Props = {};

class App extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Container>
        <MainRoute />
      </Container>
    );
  }
}

export default App;
