import React from 'react';

import Drawer from './Drawer';
import { MdClose, MdChevronLeft } from 'react-icons/md';

import { Container, Content, CloseContainer } from './styled';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onCloseClick?: () => void;
};

class BottomDrawer extends React.Component<Props> {
  render(): JSX.Element {
    const { isVisible, onClose, children, onCloseClick } = this.props;

    return (
      <Container>
        <Drawer isVisible={isVisible} onClose={onClose}>
          <CloseContainer onClick={onCloseClick}>
            {/* <MdChevronLeft size={20} /> */}
            <MdClose />
          </CloseContainer>
          <Content>{children}</Content>
        </Drawer>
      </Container>
    );
  }
}

export default BottomDrawer;
