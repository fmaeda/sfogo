import React from 'react';
import { Container, Label, Description } from './styled';

type Props = {
  icon: React.ComponentType;
  selected: boolean;
  label?: string;
  description?: string;
  onClick: () => void;
};

class IconPicker extends React.Component<Props> {
  render(): JSX.Element {
    const { icon: Icon, label, onClick, selected, description } = this.props;

    return (
      <Container onClick={onClick} selected={selected}>
        <Icon />
        {label && <Label>{label}</Label>}
        {description && <Description>{description}</Description>}
      </Container>
    );
  }
}

export default IconPicker;
