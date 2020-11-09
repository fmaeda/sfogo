import React from 'react';

import { MdChevronLeft } from 'react-icons/md';

import {
  Logo,
  BlurryPanel,
  MenuContainer,
  Container,
  Content,
  ContentBackground,
  SideBar,
  Version,
} from './styled';
import sisfogoLogo from 'resources/svg/sisfogo.svg';
import Menu from 'components/Menu';
import MainRoute from 'routes';
import { Router, Route } from 'react-router-dom';
import { createHashHistory } from 'history';

const history = createHashHistory({ hashType: 'hashbang' });

type Props = {};

type State = {
  drawerOpen: boolean;
};

class App extends React.Component<Props, State> {
  state: State = {
    drawerOpen: false,
  };

  toggleDrawer = (): void => {
    this.setState(({ drawerOpen, ...rest }) => ({
      ...rest,
      drawerOpen: !drawerOpen,
    }));
  };

  render(): JSX.Element {
    const { drawerOpen } = this.state;

    return (
      <Router history={history}>
        <Container>
          <MenuContainer>
            <SideBar drawerOpen={drawerOpen}>
              <MdChevronLeft onClick={this.toggleDrawer} />
              <Logo src={sisfogoLogo} />
              <Route path="/" component={Menu} />
            </SideBar>
          </MenuContainer>
          <ContentBackground drawerOpen={drawerOpen}>
            <Content drawerOpen={drawerOpen}>
              <MainRoute onMenuClick={this.toggleDrawer} />
              {drawerOpen && (
                <BlurryPanel
                  onClick={() => this.setState({ drawerOpen: false })}
                />
              )}
            </Content>
          </ContentBackground>
        </Container>
        <Version>{process.env.REACT_APP_BUILD_TIME}</Version>
      </Router>
    );
  }
}

export default App;
