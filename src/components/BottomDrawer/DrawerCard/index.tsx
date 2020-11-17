import React from 'react';

import { Container, ButtonsRow } from './styled';

type Props = {
  title: string;
};

class DrawerCard extends React.Component<Props> {
  render(): JSX.Element {
    const { children, title } = this.props;

    return (
      <Container>
        <h3>{title}</h3>
        <ButtonsRow>{children}</ButtonsRow>
      </Container>
    );
  }
}

export default DrawerCard;
