import React from 'react';
import { ItemContainer } from './styled';

type Props = {
  icon: React.ComponentType;
  selected: boolean;
  label: string;
  onClick: () => void;
};

class Item extends React.Component<Props> {
  render(): JSX.Element {
    const { icon: Icon, label, onClick, selected } = this.props;

    return (
      <ItemContainer onClick={onClick} selected={selected}>
        <Icon />
        <span>{label}</span>
      </ItemContainer>
    );
  }
}

export default Item;
