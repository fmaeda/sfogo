import React from 'react';
import ReactMapGL, {
  FlyToInterpolator,
  ViewportProps,
  WebMercatorViewport,
} from 'react-map-gl';
import { FaFireExtinguisher, FaLayerGroup } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdChevronLeft, MdMyLocation } from 'react-icons/md';
import { easeCubic } from 'd3-ease';

import {
  TopBar,
  Logo,
  BlurryPanel,
  ActionButtons,
  SearchContainer,
  ButtonBar,
  MenuContainer,
  Container,
  Header,
  MapContainer,
  Content,
  SideBar,
  FabContainer,
} from './styled';
import FireButton from 'components/FireButton';
import sisfogoLogo from 'resources/svg/sisfogo.svg';
import SearchBox, { Result } from 'components/SearchBox';

type Props = {};

type State = {
  viewport: Partial<ViewportProps>;
  drawerOpen: boolean;
};

class MapRoute extends React.Component<Props, State> {
  state = {
    viewport: {
      longitude: -47.708052,
      latitude: -15.888663,
      zoom: 11,
      bearing: 0,
      pitch: 0,
    },
    drawerOpen: false,
  };

  mapRef = React.createRef<ReactMapGL>();

  async componentDidMount(): Promise<void> {
    const {
      coords: { latitude, longitude },
    } = await this.getCurrentLocation();
    return this.setState(({ viewport, ...rest }) => ({
      ...rest,
      viewport: {
        ...viewport,
        latitude,
        longitude,
        zoom: 15,
      },
    }));
  }

  getCurrentLocation = async (): Promise<Position> => {
    if ('geolocation' in navigator) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }
    return Promise.reject();
  };

  handleViewportChange = (viewport: ViewportProps): void => {
    this.setState({
      viewport,
    });
  };

  toggleDrawer = (): void => {
    this.setState(({ drawerOpen, ...rest }) => ({
      ...rest,
      drawerOpen: !drawerOpen,
    }));
  };

  handleCurrentLocationClick = async (): Promise<void> => {
    const {
      coords: { latitude, longitude },
    } = await this.getCurrentLocation();
    this.flyTo(latitude, longitude);
  };

  flyTo = (lat: number, lon: number): void => {
    // this.mapRef.current?.getMap().flyTo({
    //   center: [lon, lat],
    //   zoom: 15,
    // });
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        longitude: lon,
        latitude: lat,
        zoom: 15,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic,
      },
    });
  };

  fitBounds = (bbox: [[number, number], [number, number]]): void => {
    const { longitude, latitude, zoom } = new WebMercatorViewport(
      this.state.viewport,
    ).fitBounds(bbox, {
      // padding: 20,
      // offset: [0, -100],
    });
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        longitude,
        latitude,
        zoom,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic,
      },
    });
  };

  handleResultSelect = (result: Result): void => {
    // this.flyTo(result.lat, result.lon);
    console.log('result', result.boundingbox);
    const [x, y, min, max] = result.boundingbox.map(Number);
    this.fitBounds([
      [min, x],
      [max, y],
    ]);
  };

  render(): JSX.Element {
    const { viewport, drawerOpen } = this.state;

    return (
      <Container>
        <MenuContainer>
          <SideBar drawerOpen={drawerOpen}>
            <MdChevronLeft onClick={this.toggleDrawer} />
          </SideBar>
          <Header>
            <Logo src={sisfogoLogo} />
          </Header>
        </MenuContainer>
        <Content drawerOpen={drawerOpen}>
          <MapContainer drawerOpen={drawerOpen}>
            <TopBar>
              <GiHamburgerMenu
                size={20}
                // color="black"
                onClick={this.toggleDrawer}
              />
              <h3>Registro de Incidente</h3>
              <GiHamburgerMenu size={20} color="transparent" />
            </TopBar>
            <SearchContainer>
              <SearchBox onSelect={this.handleResultSelect} />
            </SearchContainer>
            <ReactMapGL
              width="100%"
              height="100%"
              ref={this.mapRef}
              {...viewport}
              onViewportChange={this.handleViewportChange}
              // onResize={() => this.m apRef.current?.getMap().resize()}
              // onResize={() => console.log('resize')}
              mapStyle={{
                version: 8,
                sources: {
                  osm: {
                    type: 'raster',
                    tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                    tileSize: 256,
                    attribution:
                      // eslint-disable-next-line max-len
                      'Map tiles by <a target="_top" rel="noopener" href="https://tile.openstreetmap.org/">OpenStreetMap tile servers</a>, under the <a target="_top" rel="noopener" href="https://operations.osmfoundation.org/policies/tiles/">tile usage policy</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>',
                  },
                },
                layers: [
                  {
                    id: 'osm',
                    type: 'raster',
                    source: 'osm',
                    minzoom: 0,
                    maxzoom: 22,
                  },
                ],
              }}
            ></ReactMapGL>
            <ActionButtons>
              <FaLayerGroup size={20} />
              <MdMyLocation
                size={20}
                onClick={this.handleCurrentLocationClick}
              />
            </ActionButtons>
            <FabContainer>
              <FireButton />
            </FabContainer>
            {drawerOpen && (
              <BlurryPanel
                onClick={() => this.setState({ drawerOpen: false })}
              />
            )}
          </MapContainer>
          {/* <ButtonBar>
            <FaFireExtinguisher />
            <FaFireExtinguisher />
            <FireButton />
            <FaFireExtinguisher />
            <FaFireExtinguisher />
          </ButtonBar> */}
        </Content>
      </Container>
    );
  }
}

export default MapRoute;
