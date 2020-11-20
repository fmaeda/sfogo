import React from 'react';

import { ItemContainer } from './styled';

type Props = {
  label: string;
  selected?: boolean;
};

class TabBarItem extends React.Component<Props> {
  render(): JSX.Element {
    const { label, selected } = this.props;

    return <ItemContainer selected={selected}>{label}</ItemContainer>;
  }
}

export default TabBarItem;
