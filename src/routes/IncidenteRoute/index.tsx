import React from 'react';
import ReactMapGL, {
  FlyToInterpolator,
  ViewportProps,
  WebMercatorViewport,
  PointerEvent,
  Marker,
} from 'react-map-gl';
import qs from 'qs';
import axios, { AxiosResponse } from 'axios';
import { FaLayerGroup, FaMapMarkerAlt, FaTimes, FaCheck } from 'react-icons/fa';
import { FiRefreshCcw } from 'react-icons/fi';
import { easeCubic } from 'd3-ease';
import BottomDrawer from 'components/BottomDrawer';
import FireIcon from 'components/FireIcon';
import FAB from 'components/FAB';

import {
  ActionButtons,
  SearchContainer,
  Content,
  FabContainer,
  MarkerContainer,
  HintContainer,
  ConfirmContainer,
  DrawerContent,
  MapContainer,
} from './styled';
import SearchBox, { Result } from 'components/SearchBox';
import Address from 'components/Address';
import NivelAcionamentoPicker from 'components/NivelAcionamentoPicker';
import { NivelAcionamento } from 'model/nivelAcionamento';
import { MdMyLocation } from 'react-icons/md';
import AppBar from 'components/AppBar';

enum EditMode {
  NONE,
  SET_MARKER,
  INPUT_DETAILS,
}

type LatLon = {
  latitude: number;
  longitude: number;
};

type AddressDetails = {
  state: string;
  addresstype: string;
} & Record<string, string>;

type Props = {};

type State = {
  viewport: Partial<ViewportProps>;
  bottomDrawerOpen: boolean;
  editMode: EditMode;
  currentAddress?: {
    uf: string;
    municipio: string;
    descricao: string;
  };
  markerLatLon?: LatLon;
  nivelAcionamento?: NivelAcionamento;
};

const getAddressDescription = (address: AddressDetails): string => {
  const name = address[address.addresstype];
  return (
    name ?? address.suburb ?? address.neighbourhood ?? address.county ?? ''
  );
};

const getCity = (address: AddressDetails): string => {
  return address.city ?? address.town ?? address.village ?? '';
};

class IncidenteRoute extends React.Component<Props, State> {
  state: State = {
    viewport: {
      longitude: -47.708052,
      latitude: -15.888663,
      zoom: 11,
      bearing: 0,
      pitch: 0,
    },
    bottomDrawerOpen: false,
    editMode: EditMode.NONE,
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

  handleCurrentLocationClick = async (): Promise<void> => {
    const {
      coords: { latitude, longitude },
    } = await this.getCurrentLocation();
    this.flyTo(latitude, longitude);
  };

  flyToPreview = ({ latitude, longitude }: LatLon): void => {
    const container = this.mapRef.current?.getMap().getContainer();
    const width = container?.clientWidth ?? 1;
    const height = container?.clientHeight ?? 1;

    const newViewport = new WebMercatorViewport({
      width,
      height,
    }).fitBounds(
      [
        [longitude, latitude],
        [longitude, latitude - 0.0035],
      ],
      {
        offset: [0, -160],
      },
    );
    this.setState({
      viewport: {
        ...newViewport,
        zoom: 16,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic,
      },
    });
  };

  flyTo = (lat: number, lon: number): void => {
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

  fetchDetails = async (lat: number, lon: number): Promise<AddressDetails> => {
    const query = qs.stringify({
      lat,
      lon,
      polygon_geojson: 0,
      'accept-language': 'pt-BR',
      countrycodes: 'br',
      format: 'jsonv2',
      addressdetails: 1,
      zoom: 18,
    });
    return axios
      .get(`https://nominatim.openstreetmap.org/reverse?${query}`)
      .then(
        ({
          data: { address, addresstype },
        }: AxiosResponse<{ addresstype: string; address: AddressDetails }>) => {
          // console.log('data', data);
          return {
            ...address,
            addresstype,
          };
        },
      );
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

  handleMapClick = async (evt: PointerEvent): Promise<void> => {
    // console.log('click', evt);
    const { editMode } = this.state;
    if (editMode === EditMode.SET_MARKER) {
      const [longitude, latitude] = evt.lngLat;
      // const result = await this.fetchDetails(latitude, longitude);
      // console.log('result', result);
      this.setState({
        markerLatLon: { latitude, longitude },
      });
    }
  };

  handleCancel = (): void => {
    this.setState({
      markerLatLon: undefined,
      editMode: EditMode.NONE,
    });
  };

  handleConfirm = async (): Promise<void> => {
    const { markerLatLon } = this.state;
    if (markerLatLon) {
      const address = await this.fetchDetails(
        markerLatLon.latitude,
        markerLatLon.longitude,
      );

      this.setState(
        {
          editMode: EditMode.INPUT_DETAILS,
          bottomDrawerOpen: true,
          currentAddress: {
            uf: address.state,
            municipio: getCity(address),
            descricao: getAddressDescription(address),
          },
        },
        () => {
          this.flyToPreview(markerLatLon);
        },
      );
    }
  };

  renderFabArea = (): JSX.Element => {
    const { editMode: drawMode, markerLatLon } = this.state;
    switch (drawMode) {
      case EditMode.SET_MARKER: {
        return (
          <>
            {markerLatLon ? (
              <HintContainer>Confirme a operação</HintContainer>
            ) : (
              <HintContainer>Indique o local do incidente</HintContainer>
            )}
            <ConfirmContainer>
              <FAB onClick={this.handleCancel}>
                <FaTimes color="tomato" size={24} />
              </FAB>
              {markerLatLon && (
                <FAB onClick={this.handleConfirm}>
                  <FaCheck color="lime" size={24} />
                </FAB>
              )}
            </ConfirmContainer>
          </>
        );
      }
      case EditMode.NONE:
      default: {
        return (
          <FAB onClick={() => this.setState({ editMode: EditMode.SET_MARKER })}>
            <FireIcon />
          </FAB>
        );
      }
    }
  };

  handleBottomDrawerClose = (): void => {
    // this.setState({ bottomDrawerOpen: false });
  };

  handleNivelAcionamento = (nivelAcionamento: NivelAcionamento): void => {
    this.setState({ nivelAcionamento });
  };

  reset = (): void => {
    this.setState({
      nivelAcionamento: undefined,
      markerLatLon: undefined,
      currentAddress: undefined,
      bottomDrawerOpen: false,
      editMode: EditMode.NONE,
    });
  };

  render(): JSX.Element {
    const {
      viewport,
      editMode,
      markerLatLon,
      bottomDrawerOpen,
      currentAddress,
      nivelAcionamento,
    } = this.state;
    // console.log('markerLatLon', markerLatLon);

    return (
      <Content>
        <AppBar title="Registro de Incidente" />

        {!bottomDrawerOpen && (
          <SearchContainer>
            <SearchBox onSelect={this.handleResultSelect} />
          </SearchContainer>
        )}
        <MapContainer>
          <ReactMapGL
            width="100%"
            height={bottomDrawerOpen ? '50%' : '"100%"'}
            ref={this.mapRef}
            {...viewport}
            onViewportChange={this.handleViewportChange}
            onClick={this.handleMapClick}
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
          >
            {markerLatLon && (
              <Marker
                {...markerLatLon}
                draggable={editMode === EditMode.SET_MARKER}
              >
                <MarkerContainer onClick={() => console.log('marker click')}>
                  <FaMapMarkerAlt />
                </MarkerContainer>
              </Marker>
            )}
          </ReactMapGL>
        </MapContainer>
        <ActionButtons>
          <FaLayerGroup size={20} />
          <MdMyLocation size={20} onClick={this.handleCurrentLocationClick} />
        </ActionButtons>
        <FabContainer>{this.renderFabArea()}</FabContainer>
        <BottomDrawer
          isVisible={bottomDrawerOpen}
          onClose={this.handleBottomDrawerClose}
        >
          <DrawerContent>
            {currentAddress && (
              <Address
                uf={currentAddress.uf}
                municipio={currentAddress.municipio}
                descricao={currentAddress.descricao}
              />
            )}
            <h3>Qual o Nível de Acionamento?</h3>
            <NivelAcionamentoPicker
              onSelect={this.handleNivelAcionamento}
              selected={nivelAcionamento}
            />
            {nivelAcionamento && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginBottom: 12,
                }}
              >
                <FiRefreshCcw size={40} onClick={this.reset} />
                <span style={{ textAlign: 'center', marginTop: 8 }}>
                  Reiniciar fluxo <br /> (falta implementar próximas telas)
                </span>
              </div>
            )}
          </DrawerContent>
        </BottomDrawer>
      </Content>
    );
  }
}

export default IncidenteRoute;
