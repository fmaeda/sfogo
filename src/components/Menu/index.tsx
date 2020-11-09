import React from 'react';
import { connect } from 'react-redux';

import { MdAddAlert } from 'react-icons/md';
import { IoIosMenu } from 'react-icons/io';
import logoImg from 'resources/img/logo_ibama.png';

import Item from './Item';

import { Container, Footer, Logo, Spacer } from './styled';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
// import { MenuItem, menuIcons, menuColors, menuPaths } from 'model/enums';
import { BeforeInstallPromptEvent } from 'model/beforeInstallPrompt';
import { RootState } from 'store';

const mapStateToProps = ({
  version: { serviceWorkerUpdated, serviceWorkerRegistration },
}: RootState) => ({
  serviceWorkerUpdated,
  serviceWorkerRegistration,
});

type Props = {} & RouteComponentProps & ReturnType<typeof mapStateToProps>;
type State = {
  showInstallButton: boolean;
};

class Menu extends React.Component<Props, State> {
  state = {
    showInstallButton: false,
  };

  deferredPrompt: BeforeInstallPromptEvent | null = null;

  handleClick = (path: string) => () => {
    const { history } = this.props;
    history.push(path);
  };

  componentDidMount(): void {
    window.addEventListener('beforeinstallprompt', this.handleInstall);
    window.addEventListener('DOMContentLoaded', () => {
      let displayMode = 'browser';
      if ((navigator as any).standalone) {
        displayMode = 'standalone-ios';
      }
      if (window.matchMedia('(display-mode: standalone)').matches) {
        displayMode = 'standalone';
      }
      if (displayMode === 'browser') {
        this.setState({ showInstallButton: true });
      }
      console.log('displayMode', displayMode);
    });
    window.addEventListener('appinstalled', (evt: any) => {
      console.log('installed', evt);
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
    const { serviceWorkerRegistration } = this.props;
    const registrationWaiting = serviceWorkerRegistration?.waiting;

    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' });

      registrationWaiting.addEventListener('statechange', (e: any) => {
        if (e.target?.state === 'activated') {
          window.location.reload();
        }
      });
    }
  };

  render() {
    const {
      location: { pathname },
      serviceWorkerUpdated,
    } = this.props;
    const { showInstallButton } = this.state;

    return (
      <Container>
        <Item
          icon={MdAddAlert}
          color="transparent"
          active={false}
          label="Registro de Incidentes"
          onClick={this.handleToggle}
        />
        <Item
          icon={MdAddAlert}
          color="transparent"
          active={false}
          label="Teste"
          onClick={this.handleToggle}
        />
        {/* <Spacer /> */}
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
          key={'install'}
          icon={menuIcons[key]}
          color={menuColors[key]}
          active={pathname === menuPaths[key]}
          onClick={this.handleClick(menuPaths[key])}
        /> */}
        <Spacer />
        <Footer>
          {showInstallButton && (
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

export default connect(mapStateToProps)(withRouter(Menu));
