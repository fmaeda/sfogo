import React from 'react';
import DrawerCard from 'components/BottomDrawer/DrawerCard';
import { $enum } from 'ts-enum-util';
import { TipoDeteccao, tipoDeteccaoLabels } from 'model/tipoDeteccao';

import iconMappings from './iconMappings';
import IconPicker from 'components/IconPicker';

import { Content } from './styled';

type Props = {
  selected?: TipoDeteccao;
};

type State = {
  selection: {
    [key in TipoDeteccao]?: boolean;
  };
};

class TipoDeteccaoPicker extends React.Component<Props, State> {
  state = {
    selection: {},
  };

  handleClick = (tipo: TipoDeteccao) => (): void => {
    this.setState(({ selection, ...state }) => ({
      ...state,
      selection: {
        ...selection,
        [tipo]: !selection[tipo],
      },
    }));
  };

  render(): JSX.Element {
    // const { selected } = this.props;
    const { selection } = this.state;

    return (
      <DrawerCard title="Qual foi a forma de detecção?">
        <Content>
          {$enum(TipoDeteccao).map((tipo) => (
            <IconPicker
              key={`item_${tipo}`}
              icon={iconMappings[tipo]}
              label={tipoDeteccaoLabels[tipo]}
              // description={`(${nivelAcionamentoLabels[tipo]})`}
              onClick={this.handleClick(tipo)}
              selected={!!selection[tipo]}
            />
          ))}
        </Content>
      </DrawerCard>
    );
  }
}

export default TipoDeteccaoPicker;
