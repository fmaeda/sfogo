import React from 'react';

import { IoIosMenu } from 'react-icons/io';

import Item from './Item';

import { Container, Spacer } from './styled';
import { withRouter, RouteComponentProps } from 'react-router-dom';
// import { MenuItem, menuIcons, menuColors, menuPaths } from 'model/enums';

type Props = {} & RouteComponentProps;

class Menu extends React.Component<Props> {
  handleClick = (path: string) => () => {
    const { history } = this.props;
    history.push(path);
  };

  handleToggle = () => {
    console.log('toggle');
  };

  render() {
    const {
      location: { pathname },
    } = this.props;

    return (
      <Container>
        <Item
          icon={IoIosMenu}
          color="transparent"
          active={false}
          onClick={this.handleToggle}
        />
        <Spacer />
        {/* {Object.values(MenuItem).map((key) => (
          <Item
            key={key}
            icon={menuIcons[key]}
            color={menuColors[key]}
            active={pathname === menuPaths[key]}
            onClick={this.handleClick(menuPaths[key])}
          />
        ))} */}
        {/* <Item
          key={key}
          icon={menuIcons[key]}
          color={menuColors[key]}
          active={pathname === menuPaths[key]}
          onClick={this.handleClick(menuPaths[key])}
        /> */}
      </Container>
    );
  }
}

export default withRouter(Menu);
