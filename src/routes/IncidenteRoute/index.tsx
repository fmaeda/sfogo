import React from 'react';
import ReactMapGL, {
  FlyToInterpolator,
  ViewportProps,
  WebMercatorViewport,
  PointerEvent,
  Marker,
  DragEvent,
} from 'react-map-gl';
import {
  Editor,
  DrawPolygonMode,
  EditingMode,
  RENDER_STATE,
} from 'react-map-gl-draw';
import qs from 'qs';
import axios, { AxiosResponse } from 'axios';
import {
  point,
  featureCollection,
  geometryCollection,
  AllGeoJSON,
} from '@turf/helpers';
import bbox from '@turf/bbox';
import union from '@turf/union';
import centerOfMass from '@turf/center-of-mass';
import centroid from '@turf/centroid';
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
  AddressContainer,
} from './styled';
import SearchBox, { Result } from 'components/SearchBox';
import Address from 'components/Address';
import { MdMyLocation } from 'react-icons/md';
import AppBar from 'components/AppBar';
import GeometryTypePicker from 'components/GeometryTypePicker';
import { GeometryType } from 'model/geometryType';
import { BBox, Feature, Point } from 'geojson';
import { Feature as NebulaFeature } from 'typings/nebula.gl';
import Form from './Form';
import DrawerCard from 'components/BottomDrawer/DrawerCard';

enum EditType {
  ADD_TENTATIVE_POSITION = 'addTentativePosition',
  ADD_FEATURE = 'addFeature',
  MOVE_POSITION = 'movePosition',
}

enum EditMode {
  NONE = 'NONE',
  MARKER_TYPE = 'MARKER_TYPE',
  DRAW = 'DRAW',
  EDIT = 'EDIT',
  INPUT_DETAILS = 'INPUT_DETAILS',
}

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
  locations: Feature[];
  selectedFeatureIndex?: number;
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
    locations: [],
    bottomDrawerOpen: false,
    editMode: EditMode.NONE,
  };

  editingMode = new EditingMode();
  drawPolygonMode = new DrawPolygonMode();

  mapRef = React.createRef<ReactMapGL>();
  editorRef = React.createRef<Editor>();

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
    this.flyTo(longitude, latitude);
  };

  flyToPreview = ({
    geometry: {
      coordinates: [longitude, latitude],
    },
  }: Feature<Point>): void => {
    const container = this.mapRef.current?.getMap().getContainer();
    const width = container?.clientWidth ?? 1;
    const height = container?.clientHeight ?? 1;

    const newViewport = new WebMercatorViewport({
      width,
      height,
    }).fitBounds(
      [
        [longitude, latitude],
        [longitude, latitude - 0.0025],
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

  flyToPreviewBbox = (
    boundingBox: BBox,
    featureCentroid: Feature<Point>,
  ): void => {
    const { viewport } = this.state;
    const bottomPadding = window.innerHeight / 2 + 50;
    console.log('bottomPadding', bottomPadding);
    // console.log('bbox', boundingBox);
    const { longitude, latitude, zoom } = new WebMercatorViewport(
      viewport,
    ).fitBounds(
      [
        [boundingBox[0], boundingBox[1]],
        [boundingBox[2], boundingBox[3]],
      ],
      {
        padding: {
          top: 100,
          right: 50,
          bottom: bottomPadding,
          left: 50,
        },
      },
    );

    if (zoom <= 18) {
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
    } else {
      this.flyToPreview(featureCentroid);
    }
  };

  flyTo = (longitude: number, latitude: number): void => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        longitude,
        latitude,
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

  fetchDetails = async (lon: number, lat: number): Promise<AddressDetails> => {
    const query = qs.stringify({
      lon,
      lat,
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
    console.log('result', result.boundingbox);
    const [x, y, min, max] = result.boundingbox.map(Number);
    this.fitBounds([
      [min, x],
      [max, y],
    ]);
  };

  handleMapClick = async (evt: PointerEvent): Promise<void> => {
    // console.log('click', evt);
    const { editMode, geometryType } = this.state;
    if (editMode === EditMode.DRAW && geometryType === GeometryType.POINT) {
      const [longitude, latitude] = evt.lngLat;
      const marker = point([longitude, latitude]);

      this.setState(({ locations: polygons, ...state }) => ({
        ...state,
        locations: [...polygons, marker as Feature],
      }));
    } else {
      console.log('mapClick', evt);
    }
  };

  handleCancel = (): void => {
    this.setState({
      locations: [],
      geometryType: undefined,
      editMode: EditMode.NONE,
    });
    this.editingMode = new EditingMode();
    this.drawPolygonMode = new DrawPolygonMode();
  };

  handleConfirm = async (): Promise<void> => {
    const { locations } = this.state;
    // console.log('locations', locations);
    const collection = featureCollection(locations);
    // console.log('collection', collection);
    const point: Feature<Point> = centroid(collection as AllGeoJSON);
    // console.log('center', point);
    const [longitude, latitude] = point.geometry.coordinates;
    const address = await this.fetchDetails(longitude, latitude);

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
        this.flyToPreviewBbox(bbox(collection), point);
      },
    );
  };

  renderFabArea = (): JSX.Element => {
    const { editMode: drawMode, locations } = this.state;
    const hasLocations = locations.length > 0;
    switch (drawMode) {
      case EditMode.DRAW:
      case EditMode.EDIT: {
        return (
          <>
            {hasLocations ? (
              <HintContainer>Confirme a operação</HintContainer>
            ) : (
              <HintContainer>Indique o local do incidente</HintContainer>
            )}
            <ConfirmContainer>
              <FAB onClick={this.handleCancel}>
                <FaTimes color="tomato" size={24} />
              </FAB>
              {hasLocations && (
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
    const { currentAddress, editMode, geometryType } = this.state;
    switch (editMode) {
      case EditMode.INPUT_DETAILS: {
        return (
          <DrawerContent>
            <Form />
          </DrawerContent>
        );
      }
      case EditMode.MARKER_TYPE: {
        return (
          <DrawerContent>
            <DrawerCard title="Qual o tipo da área do Incidente?">
              <GeometryTypePicker
                onSelect={this.handleGeometryType}
                selected={geometryType}
                items={[GeometryType.POINT, GeometryType.POLYGON]}
              />
            </DrawerCard>
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

  handleMarkerDragEnd = (idx: number) => (evt: DragEvent): void => {
    // console.log('evt', evt);
    const [longitude, latitude] = evt.lngLat;
    this.setState(({ locations, ...state }) => ({
      ...state,
      locations: locations.map((p, currIdx) =>
        idx === currIdx ? point([longitude, latitude]) : p,
      ),
    }));
  };

  handlePolygonSelect = ({
    selectedFeature,
    selectedFeatureIndex,
  }: {
    mapCoords: [number, number];
    screenCords: [number, number];
    selectedEditHandleIndex?: number;
    selectedFeature?: Feature;
    selectedFeatureIndex?: number;
  }): void => {
    const { selectedFeatureIndex: currentSelectionIndex } = this.state;
    if (
      selectedFeatureIndex !== undefined &&
      selectedFeatureIndex >= 0 &&
      selectedFeatureIndex !== currentSelectionIndex &&
      selectedFeature?.geometry.type === 'Polygon'
    ) {
      this.setState({ editMode: EditMode.EDIT, selectedFeatureIndex });
      this.drawPolygonMode = new DrawPolygonMode();
    }

    if (currentSelectionIndex !== undefined && selectedFeature === null) {
      this.setState({
        editMode: EditMode.DRAW,
        selectedFeatureIndex: undefined,
      });
    }
  };

  handlePolygonUpdate = ({
    data,
    editType,
  }: {
    data: Feature[];
    editType: string;
    editContext: any;
  }): void => {
    console.log('editType', editType);
    switch (editType) {
      case EditType.MOVE_POSITION:
      case EditType.ADD_FEATURE: {
        this.setState({
          locations: data,
        });
      }
    }
  };

  handleMarkerClick = (idx: number) => (
    evt: React.MouseEvent<HTMLDivElement>,
  ): void => {
    console.log('idx', idx, evt);
  };

  handleFeatureStyle = ({
    // feature,
    state,
  }: {
    feature: Feature;
    state: RENDER_STATE;
  }): any => {
    switch (state) {
      case RENDER_STATE.UNCOMMITTED: {
        return {
          stroke: 'rgb(100,100,100)',
          strokeDasharray: '4,2',
          strokeWidth: 2,
          fill: 'rgb(189,189,189)',
          fillOpacity: 0.1,
        };
      }
      case RENDER_STATE.SELECTED: {
        return {
          stroke: 'rgb(38, 181, 242)',
          strokeWidth: 2,
          fill: 'rgb(38, 181, 242)',
          fillOpacity: 0.3,
        };
      }
      default: {
        return {
          stroke: '#000000',
          strokeWidth: 2,
          fill: '#a9a9a9',
          fillOpacity: 0.5,
        };
      }
    }
  };

  reset = (): void => {
    this.setState({
      geometryType: undefined,
      currentAddress: undefined,
      selectedFeatureIndex: undefined,
      bottomDrawerOpen: false,
      editMode: EditMode.NONE,
      locations: [],
    });
    this.editingMode = new EditingMode();
    this.drawPolygonMode = new DrawPolygonMode();
  };

  render(): JSX.Element {
    const {
      viewport,
      editMode,
      bottomDrawerOpen,
      geometryType,
      currentAddress,
      locations,
      selectedFeatureIndex,
    } = this.state;
    // console.log('polygons', polygons);
    return (
      <Content>
        <AppBar title="Registro de Incidente" />

        {!bottomDrawerOpen && (
          <SearchContainer>
            <SearchBox onSelect={this.handleResultSelect} />
          </SearchContainer>
        )}
        {currentAddress && (
          <AddressContainer>
            <Address
              uf={currentAddress.uf}
              municipio={currentAddress.municipio}
              descricao={currentAddress.descricao}
            />
          </AddressContainer>
        )}
        <MapContainer>
          <ReactMapGL
            {...viewport}
            width="100%"
            height="100%"
            // height={bottomDrawerOpen ? '50%' : '"100%"'}
            ref={this.mapRef}
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
            {locations
              .filter((p) => p.geometry.type === 'Point')
              .map((p) => p.geometry as Point)
              .map((marker, idx) => (
                <Marker
                  longitude={marker.coordinates[0]}
                  latitude={marker.coordinates[1]}
                  key={`marker_${idx}`}
                  draggable={editMode === EditMode.DRAW}
                  onDragEnd={this.handleMarkerDragEnd(idx)}
                >
                  <MarkerContainer onClick={this.handleMarkerClick(idx)}>
                    <FaMapMarkerAlt />
                  </MarkerContainer>
                </Marker>
              ))}
            {geometryType === GeometryType.POLYGON && (
              <Editor
                ref={this.editorRef}
                clickRadius={12}
                key="fixed"
                selectable
                mode={
                  editMode === EditMode.DRAW
                    ? this.drawPolygonMode
                    : editMode === EditMode.EDIT
                    ? this.editingMode
                    : undefined
                }
                featureStyle={this.handleFeatureStyle}
                featuresDraggable
                selectedFeatureIndex={selectedFeatureIndex}
                features={locations as NebulaFeature[]}
                onSelect={this.handlePolygonSelect}
                onUpdate={this.handlePolygonUpdate}
              />
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
          onCloseClick={this.reset}
        >
          {this.renderDrawerContent()}
        </BottomDrawer>
      </Content>
    );
  }
}

export default IncidenteRoute;
