import React from 'react';

import { Editor, DrawPolygonMode, EditingMode } from 'react-map-gl-draw';
import { Feature } from 'typings/nebula.gl';

export enum DrawerMode {
  DRAW = 'DRAW',
  EDIT = 'EDIT',
}

const drawModes: { [key in DrawerMode]: Record<string, any> | undefined } = {
  [DrawerMode.DRAW]: new DrawPolygonMode(),
  [DrawerMode.EDIT]: new EditingMode(),
};

type Props = {};

type State = {
  mode: DrawerMode;
};

class PolygonDrawer extends React.Component<Props, State> {
  state = {
    mode: DrawerMode.DRAW,
  };

  handleSelect = ({
    // mapCoords,
    // screenCords,
    // selectedEditHandleIndex,
    selectedFeature,
    selectedFeatureIndex,
  }: {
    mapCoords: [number, number];
    screenCords: [number, number];
    selectedEditHandleIndex?: number;
    selectedFeature?: Feature;
    selectedFeatureIndex?: number;
  }): void => {
    console.log('onSelect', selectedFeatureIndex, selectedFeature);
  };

  handleUpdate = ({
    data,
    editType,
    editContext,
  }: {
    data: Feature[];
    editType: string;
    editContext: any;
  }): void => {
    console.log('update', {
      editType,
      // data,
      editContext,
    });
  };

  render(): JSX.Element {
    const { mode } = this.state;

    return (
      <Editor
        onSelect={this.handleSelect}
        onUpdate={this.handleUpdate}
        mode={drawModes[mode]}
      />
    );
  }
}

export default PolygonDrawer;
