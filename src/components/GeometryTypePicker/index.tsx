import React from 'react';
import styled from 'styles';
import IconPicker from 'components/IconPicker';
import { GeometryType, geometryTypeLabels } from 'model/geometryType';

import iconMappings from './iconMappings';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

type Props = {
  items: GeometryType[];
  selected?: GeometryType;
  onSelect: (geometryType: GeometryType) => void;
};

class GeometryTypePicker extends React.Component<Props> {
  handleSelect = (geometryType: GeometryType) => (): void => {
    const { onSelect } = this.props;
    onSelect(geometryType);
  };

  render(): JSX.Element {
    const { items, selected } = this.props;

    return (
      <Container>
        {items.map((geometryType) => (
          <IconPicker
            key={`pick_${geometryType}`}
            icon={iconMappings[geometryType]}
            onClick={this.handleSelect(geometryType)}
            selected={selected === geometryType}
            label={geometryTypeLabels[geometryType]}
          />
        ))}
      </Container>
    );
  }
}

export default GeometryTypePicker;
