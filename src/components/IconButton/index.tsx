import React from 'react';

import { Container } from './styled';
import Ripple from 'components/Ripple';

type Props = {
  icon: React.ComponentType;
  onClick?: () => void;
  label?: string;
};

class IconButton extends React.Component<Props> {
  render(): JSX.Element {
    const { icon: Icon, label, onClick } = this.props;

    return (
      <Container onClick={onClick}>
        <Icon />
        <span>{label}</span>
        <Ripple color="gray" />
      </Container>
    );
  }
}

export default IconButton;
