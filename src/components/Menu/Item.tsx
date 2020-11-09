import React from 'react';
import { ItemContainer, SelectedMarker, ItemLabel } from './styled';

type Props = {
  icon: React.ComponentType;
  onClick: () => void;
  color: string;
  label: string;
  active?: boolean;
};

class Item extends React.Component<Props> {
  render(): JSX.Element {
    const { active, icon: Icon, onClick, color, label } = this.props;

    return (
      <ItemContainer active={!!active} onClick={onClick} color={color}>
        <Icon />
        <SelectedMarker color={color} active={active} />
        <ItemLabel>{label}</ItemLabel>
      </ItemContainer>
    );
  }
}

export default Item;
