import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import { connect } from 'react-redux';

import { Container } from './styled';
import { menuActions } from 'store/menu/index';

type Props = {
  setMenuOpen: typeof menuActions.setMenuOpen;
  title: string;
};

class AppBar extends React.Component<Props> {
  handleMenuClick = (): void => {
    const { setMenuOpen } = this.props;
    setMenuOpen(true);
  };

  render(): JSX.Element {
    const { title } = this.props;

    return (
      <Container>
        <GiHamburgerMenu
          size={20}
          color="white"
          onClick={this.handleMenuClick}
        />
        <h3>{title}</h3>
        <GiHamburgerMenu size={20} color="transparent" />
      </Container>
    );
  }
}

export default connect(null, {
  setMenuOpen: menuActions.setMenuOpen,
})(AppBar);
