import React from 'react';

import Drawer from './Drawer';

import { Container, Content } from './styled';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

class BottomDrawer extends React.Component<Props> {
  render(): JSX.Element {
    const { isVisible, onClose, children } = this.props;

    return (
      <Container>
        <Drawer isVisible={isVisible} onClose={onClose}>
          <Content>{children}</Content>
        </Drawer>
      </Container>
    );
  }
}

export default BottomDrawer;
