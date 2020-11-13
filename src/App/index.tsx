import React from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import { connect } from 'react-redux';

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

import * as serviceWorkerRegistration from 'serviceWorkerRegistration';
import { versionActions, versionThunks } from 'store/version';
import Notifier from 'components/Notifier';
import { notificationActions } from 'store/notification';
import { ThunkActionDispatch } from 'redux-thunk';
import { RootState } from 'store';
import { menuActions } from 'store/menu/index';
import Avatar from 'components/Avatar';

const history = createHashHistory({ hashType: 'hashbang' });

const mapStateToProps = ({ menu: { mainMenuOpen } }: RootState) => ({
  mainMenuOpen,
});

type Props = {
  initVersion: typeof versionActions.init;
  updateVersion: typeof versionActions.update;
  addNotification: typeof notificationActions.addNotification;
  closeNotification: typeof notificationActions.closeNotification;
  updateApp: ThunkActionDispatch<typeof versionThunks.updateApp>;
  setMenuOpen: typeof menuActions.setMenuOpen;
} & ReturnType<typeof mapStateToProps>;

class App extends React.Component<Props> {
  componentDidMount(): void {
    const {
      initVersion,
      updateVersion,
      addNotification,
      closeNotification,
      updateApp,
    } = this.props;

    serviceWorkerRegistration.register({
      onSuccess: (evt) => {
        initVersion();
        console.log('SW_init', evt);
      },
      onUpdate: (evt) => {
        console.log('SW_update', evt);
        updateVersion(evt);
        addNotification(<p>Há uma nova versão disponível</p>, {
          variant: 'info',
          persist: true,
          action: (key) => (
            <button
              onClick={() => {
                closeNotification(key);
                updateApp();
              }}
            >
              Atualizar
            </button>
          ),
        });
      },
    });
    document.addEventListener('visibilitychange', () => {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (document.visibilityState === 'visible') {
          console.log('checking for updates...');
          reg?.update();
        }
      });
    });
  }

  render(): JSX.Element {
    const { mainMenuOpen, setMenuOpen } = this.props;

    return (
      <Router history={history}>
        <Container>
          <Notifier />
          <MenuContainer>
            <SideBar drawerOpen={mainMenuOpen}>
              {/* <MdChevronLeft onClick={this.toggleDrawer} /> */}
              <Logo src={sisfogoLogo} />
              <Avatar />
              <Route path="/" component={Menu} />
            </SideBar>
          </MenuContainer>
          <ContentBackground drawerOpen={mainMenuOpen}>
            <Content drawerOpen={mainMenuOpen}>
              <MainRoute />
              {mainMenuOpen && (
                <BlurryPanel onClick={() => setMenuOpen(false)} />
              )}
            </Content>
          </ContentBackground>
        </Container>
        <Version>{process.env.REACT_APP_BUILD_TIME}</Version>
      </Router>
    );
  }
}

export default connect(mapStateToProps, {
  initVersion: versionActions.init,
  updateVersion: versionActions.update,
  updateApp: versionThunks.updateApp,
  addNotification: notificationActions.addNotification,
  closeNotification: notificationActions.closeNotification,
  setMenuOpen: menuActions.setMenuOpen,
})(App);
