import React from 'react';
import { ItemContainer, SelectedMarker } from './styled';

type Props = {
  icon: React.ComponentType;
  onClick: () => void;
  color: string;
  active?: boolean;
};

class Item extends React.Component<Props> {
  render(): JSX.Element {
    const { active, icon: Icon, onClick, color } = this.props;

    return (
      <ItemContainer active={!!active} onClick={onClick} color={color}>
        <Icon />
        <SelectedMarker color={color} active={active} />
      </ItemContainer>
    );
  }
}

export default Item;
