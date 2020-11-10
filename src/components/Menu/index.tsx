import React from 'react';
import { connect } from 'react-redux';
import { $enum } from 'ts-enum-util';
import logoImg from 'resources/img/logo_ibama.png';

import Item from './Item';

import { Container, Footer, Logo, Spacer } from './styled';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import { BeforeInstallPromptEvent } from 'model/beforeInstallPrompt';
import { RootState } from 'store';
import { ThunkActionDispatch } from 'redux-thunk';
import { versionThunks } from 'store/version';

import iconMappings from './iconMappings';
import { Menu, menuRoutes, menuLabels } from 'model/menu';
import { menuActions } from 'store/menu/index';

const mapStateToProps = ({ version: { serviceWorkerUpdated } }: RootState) => ({
  serviceWorkerUpdated,
});

type Props = {
  updateApp: ThunkActionDispatch<typeof versionThunks.updateApp>;
  setMenuOpen: typeof menuActions.setMenuOpen;
} & RouteComponentProps &
  ReturnType<typeof mapStateToProps>;
type State = {
  showInstallButton: boolean;
};

class MenuComponent extends React.Component<Props, State> {
  state = {
    showInstallButton: false,
  };

  deferredPrompt: BeforeInstallPromptEvent | null = null;

  componentDidMount(): void {
    window.addEventListener('beforeinstallprompt', this.handleInstall);
    window.addEventListener('appinstalled', (evt: any) => {
      console.log('installed', evt);
      this.deferredPrompt = null;
      this.setState({ showInstallButton: false });
    });
  }

  handleInstall = (evt: BeforeInstallPromptEvent): void => {
    console.log('install');
    this.deferredPrompt = evt;
  };

  handleToggle = () => {
    // console.log('toggle');
  };

  handleInstallClick = (): void => {
    this.deferredPrompt?.prompt();
  };

  handleUpdateClick = (): void => {
    const { updateApp } = this.props;
    updateApp();
  };

  handleMenuPress = (menuItem: Menu) => () => {
    const { history, setMenuOpen } = this.props;
    const menuRoute = menuRoutes[menuItem];
    history.push(menuRoute);
    setMenuOpen(false);
  };

  render() {
    const {
      location: { pathname },
      serviceWorkerUpdated,
    } = this.props;
    const { showInstallButton } = this.state;

    return (
      <Container>
        {$enum(Menu).map((menuItem) => (
          <Item
            key={`menu_${menuItem}`}
            icon={iconMappings[menuItem]}
            color="transparent"
            active={pathname === menuRoutes[menuItem]}
            label={menuLabels[menuItem]}
            onClick={this.handleMenuPress(menuItem)}
          />
        ))}
        <Spacer />
        <Footer>
          {showInstallButton && this.deferredPrompt && (
            <Item
              icon={FaDownload}
              color="transparent"
              active={false}
              label="Instalar App"
              onClick={this.handleInstallClick}
            />
          )}
          {serviceWorkerUpdated && (
            <Item
              icon={FaDownload}
              color="transparent"
              active={false}
              label="Atualizar App"
              onClick={this.handleUpdateClick}
            />
          )}
          <Logo src={logoImg} />
        </Footer>
      </Container>
    );
  }
}

export default connect(mapStateToProps, {
  updateApp: versionThunks.updateApp,
  setMenuOpen: menuActions.setMenuOpen,
})(withRouter(MenuComponent));
