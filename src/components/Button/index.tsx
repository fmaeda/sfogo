import React from 'react';

import { Container } from './styled';

type Props = {
  label: string;
  onClick?: () => void;
  color?: string;
};

class Button extends React.Component<Props> {
  render(): JSX.Element {
    const { label, color, onClick } = this.props;

    return (
      <Container color={color} onClick={onClick}>
        {label}
      </Container>
    );
  }
}

export default Button;
