import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdArrowBack } from 'react-icons/md';

import { connect } from 'react-redux';

import { Container, Content, TitleContainer } from './styled';
import { menuActions } from 'store/menu/index';

type Props = {
  setMenuOpen: typeof menuActions.setMenuOpen;
  title: string;
  collapseTitle?: boolean;
  onBackClick?: () => void;
  children?: React.ReactNode;
};

class AppBar extends React.Component<Props> {
  handleMenuClick = (): void => {
    const { setMenuOpen } = this.props;
    setMenuOpen(true);
  };

  render(): JSX.Element {
    const { title, collapseTitle, children, onBackClick } = this.props;

    return (
      <Container>
        {!collapseTitle ? (
          <>
            <GiHamburgerMenu
              size={20}
              color="white"
              onClick={this.handleMenuClick}
            />
            <h3>{title}</h3>
          </>
        ) : (
          <MdArrowBack size={20} color="white" onClick={onBackClick} />
        )}
        <Content collapsed={!collapseTitle}>{children}</Content>
      </Container>
    );
  }
}

export default connect(null, {
  setMenuOpen: menuActions.setMenuOpen,
})(AppBar);
