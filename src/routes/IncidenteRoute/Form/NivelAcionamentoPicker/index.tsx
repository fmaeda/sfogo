import {
  NivelAcionamento,
  nivelAcionamentoIcons,
  nivelAcionamentoLabels,
} from 'model/nivelAcionamento';
import React from 'react';

import { $enum } from 'ts-enum-util';

import IconPicker from 'components/IconPicker';
import DrawerCard from 'components/BottomDrawer/DrawerCard';

const labelMappings: { [key in NivelAcionamento]: string } = {
  [NivelAcionamento.MUNICIPAL]: 'Nível 1',
  [NivelAcionamento.ESTADUAL]: 'Nível 2',
  [NivelAcionamento.FEDERAL]: 'Nível 3',
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
      <DrawerCard title="Qual o Nível de Acionamento?">
        {$enum(NivelAcionamento).map((nivel) => (
          <IconPicker
            key={`item_${nivel}`}
            icon={nivelAcionamentoIcons[nivel]}
            label={labelMappings[nivel]}
            description={`(${nivelAcionamentoLabels[nivel]})`}
            onClick={this.handleClick(nivel)}
            selected={nivel === selected}
          />
        ))}
      </DrawerCard>
    );
  }
}

export default NivelAcionamentoPicker;
