import React from 'react';

import { Container, RippleContainer } from './styled';
import Ripple from 'components/Ripple/index';

type Props = {
  label: string;
  onClick?: () => void;
  color?: string;
  disabled?: boolean;
};

class Button extends React.Component<Props> {
  render(): JSX.Element {
    const { label, color, onClick, disabled } = this.props;

    return (
      <Container
        color={color}
        disabled={disabled}
        onClick={!!disabled ? () => null : onClick}
      >
        <RippleContainer>
          {label}
          {!disabled && <Ripple color="silver" />}
        </RippleContainer>
      </Container>
    );
  }
}

export default Button;
