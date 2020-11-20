import React from 'react';

import { Container } from './styled';

type Props = {};

class TabBar extends React.Component<Props> {
  render(): JSX.Element {
    const { children } = this.props;
    return <Container>{children}</Container>;
  }
}

export default TabBar;

export { default as TabBarItem } from './TabBarItem';
