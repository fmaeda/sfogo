import React from 'react';

import { Container, Pulse, IconContainer } from './styled';

type Props = {};

class MyLocation extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Container>
        <IconContainer />
        {/* <Pin /> */}
        <Pulse />
      </Container>
    );
  }
}

export default MyLocation;
