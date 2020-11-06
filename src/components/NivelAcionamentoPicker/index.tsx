import {
  NivelAcionamento,
  nivelAcionamentoLabels,
} from 'model/nivelAcionamento';
import React from 'react';

import { $enum } from 'ts-enum-util';
import { FaLandmark, FaCity } from 'react-icons/fa';
import { GiBrazil } from 'react-icons/gi';

import Item from './Item';

import { Container } from './styled';

const iconMappings: { [key in NivelAcionamento]: React.ComponentType } = {
  [NivelAcionamento.MUNICIPAL]: FaCity,
  [NivelAcionamento.ESTADUAL]: FaLandmark,
  [NivelAcionamento.FEDERAL]: GiBrazil,
};

type Props = {
  selected?: NivelAcionamento;
  onSelect: (nivelAcionamento: NivelAcionamento) => void;
};

class NivelAcionamentoPicker extends React.Component<Props> {
  handleClick = (nivel: NivelAcionamento) => (): void => {
    const { onSelect } = this.props;
    onSelect(nivel);
  };

  render(): JSX.Element {
    const { selected } = this.props;

    return (
      <Container>
        {$enum(NivelAcionamento).map((nivel) => (
          <Item
            key={`item_${nivel}`}
            icon={iconMappings[nivel]}
            label={nivelAcionamentoLabels[nivel]}
            onClick={this.handleClick(nivel)}
            selected={nivel === selected}
          />
        ))}
      </Container>
    );
  }
}

export default NivelAcionamentoPicker;
