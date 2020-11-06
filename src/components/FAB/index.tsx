import React from 'react';

import { Container, Glass } from './styled';

type Props = {
  onClick: () => void;
};

class FAB extends React.Component<Props> {
  render(): JSX.Element {
    const { onClick, children } = this.props;

    return (
      <Glass>
        <Container onClick={onClick}>{children}</Container>
      </Glass>
    );
  }
}

export default FAB;
