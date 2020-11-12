import React from 'react';
import ReactMapGL, {
  FlyToInterpolator,
  ViewportProps,
  WebMercatorViewport,
  PointerEvent,
  Marker,
  DragEvent,
} from 'react-map-gl';
import qs from 'qs';
import axios, { AxiosResponse } from 'axios';
import { points } from '@turf/helpers';
import bbox from '@turf/bbox';
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
import GeometryTypePicker from 'components/GeometryTypePicker';
import { GeometryType } from 'model/geometryType';

const DEAFULT_MARKERS = [
  { latitude: -15.839131300049361, longitude: -48.0194073719668 },
  { latitude: -15.839131300049361, longitude: -48.01719723173883 },
  { latitude: -15.837830789183949, longitude: -48.01816282698419 },
  { latitude: -15.83968865928514, longitude: -48.01824865767236 },
];

enum EditMode {
  NONE,
  MARKER_TYPE,
  DRAW,
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
  markers: LatLon[];
  nivelAcionamento?: NivelAcionamento;
  geometryType?: GeometryType;
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
    markers: [],
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

  flyToPreviewBbox = (): void => {
    const { markers } = this.state;
    if (markers.length === 1) {
      this.flyToPreview(markers[0]);
    } else {
      const multiPoint = points(
        markers.map(({ longitude, latitude }) => [longitude, latitude]),
      );
      const boundingBox = bbox(multiPoint);
      const { longitude, latitude, zoom } = new WebMercatorViewport(
        this.state.viewport,
      ).fitBounds(
        [
          [boundingBox[0], boundingBox[1]],
          [boundingBox[2], boundingBox[3]],
        ],
        {
          padding: {
            top: 100,
            right: 50,
            bottom: 300,
            left: 50,
          },
          // offset: [-10, 0],
        },
      );
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
    }
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
    ).fitBounds(bbox);

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
    if (editMode === EditMode.DRAW) {
      const [longitude, latitude] = evt.lngLat;
      console.log('lat/lon', {
        latitude,
        longitude,
      });
      // const result = await this.fetchDetails(latitude, longitude);
      // console.log('result', result);
      this.setState(({ markers, ...state }) => ({
        ...state,
        markers: [...markers, { latitude, longitude }],
      }));
    }
  };

  handleCancel = (): void => {
    this.setState({
      markers: [],
      geometryType: undefined,
      editMode: EditMode.NONE,
    });
  };

  handleConfirm = async (): Promise<void> => {
    const { markers } = this.state;
    if (markers.length >= 1) {
      const marker = markers[0];
      const address = await this.fetchDetails(
        marker.latitude,
        marker.longitude,
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
          // this.flyToPreview(marker);
          this.flyToPreviewBbox();
        },
      );
    }
  };

  renderFabArea = (): JSX.Element => {
    const { editMode: drawMode, markers } = this.state;
    const hasMarkers = markers.length > 0;
    switch (drawMode) {
      case EditMode.DRAW: {
        return (
          <>
            {hasMarkers ? (
              <HintContainer>Confirme a operação</HintContainer>
            ) : (
              <HintContainer>Indique o local do incidente</HintContainer>
            )}
            <ConfirmContainer>
              <FAB onClick={this.handleCancel}>
                <FaTimes color="tomato" size={24} />
              </FAB>
              {hasMarkers && (
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
          <FAB
            onClick={() =>
              this.setState({
                editMode: EditMode.MARKER_TYPE,
                bottomDrawerOpen: true,
              })
            }
          >
            <FireIcon />
          </FAB>
        );
      }
    }
  };

  handleGeometryType = (geometryType: GeometryType): void => {
    this.setState({
      geometryType,
      editMode: EditMode.DRAW,
      bottomDrawerOpen: false,
    });
  };

  renderDrawerContent = (): JSX.Element | null => {
    const {
      currentAddress,
      nivelAcionamento,
      editMode,
      geometryType,
    } = this.state;
    switch (editMode) {
      case EditMode.INPUT_DETAILS: {
        return (
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
        );
      }
      case EditMode.MARKER_TYPE: {
        return (
          <DrawerContent>
            <h3>Qual o tipo da área do Incidente?</h3>
            <GeometryTypePicker
              onSelect={this.handleGeometryType}
              selected={geometryType}
              items={[GeometryType.POINT, GeometryType.POLYGON]}
            />
          </DrawerContent>
        );
      }
      default:
        return null;
    }
  };

  handleBottomDrawerClose = (): void => {
    // this.setState({ bottomDrawerOpen: false });
  };

  handleNivelAcionamento = (nivelAcionamento: NivelAcionamento): void => {
    this.setState({ nivelAcionamento });
  };

  handleMarkerDragEnd = (idx: number) => (evt: DragEvent): void => {
    // console.log('evt', evt);
    const [longitude, latitude] = evt.lngLat;
    this.setState(({ markers, ...state }) => ({
      ...state,
      markers: markers.map((m, currIdx) =>
        idx === currIdx ? { longitude, latitude } : m,
      ),
    }));
    // this.setState({
    //   markerLatLon: {
    //     longitude,
    //     latitude,
    //   },
    // });
  };

  handleMarkerClick = (idx: number) => (
    evt: React.MouseEvent<HTMLDivElement>,
  ): void => {
    console.log('idx', idx, evt);
  };

  reset = (): void => {
    this.setState({
      nivelAcionamento: undefined,
      geometryType: undefined,
      currentAddress: undefined,
      bottomDrawerOpen: false,
      editMode: EditMode.NONE,
      markers: [],
    });
  };

  render(): JSX.Element {
    const { viewport, editMode, bottomDrawerOpen, markers } = this.state;

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
            {markers.map((marker, idx) => (
              <Marker
                {...marker}
                key={`marker_${idx}`}
                draggable={editMode === EditMode.DRAW}
                onDragEnd={this.handleMarkerDragEnd(idx)}
              >
                <MarkerContainer onClick={this.handleMarkerClick(idx)}>
                  <FaMapMarkerAlt />
                </MarkerContainer>
              </Marker>
            ))}
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
          {this.renderDrawerContent()}
        </BottomDrawer>
      </Content>
    );
  }
}

export default IncidenteRoute;
