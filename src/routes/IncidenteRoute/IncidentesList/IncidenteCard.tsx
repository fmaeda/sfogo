import React from 'react';

import { parseISO } from 'date-fns';
import {
  CardContainer,
  IconContainer,
  CardContent,
  DetailsContainer,
  IconLabel,
  ButtonBar,
  AddressContainer,
  CloseContainer,
} from './styled';
import { Incidente } from 'model/incidente';
import {
  nivelAcionamentoIcons,
  nivelAcionamentoLabels,
} from 'model/nivelAcionamento';

import { FaPaperPlane, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { MdMoreHoriz, MdClose } from 'react-icons/md';
import IconButton from 'components/IconButton';
import Address from 'components/Address';
import { ufLabels } from 'model/uf';
import DateTime from 'components/DateTime';

type Props = {
  incidente: Incidente;
  selected?: boolean;
  onCloseClick?: () => void;
};

class IncidenteCard extends React.Component<Props> {
  render(): JSX.Element {
    const { incidente, selected, onCloseClick } = this.props;
    const Icon = nivelAcionamentoIcons[incidente.nivelAcionamento];
    const { localidade } = incidente;

    return (
      <CardContainer selected={selected}>
        <CloseContainer>
          <MdClose onClick={onCloseClick} />
        </CloseContainer>
        <IconContainer selected={selected}>
          <Icon />
          <IconLabel>
            {nivelAcionamentoLabels[incidente.nivelAcionamento]}
          </IconLabel>
        </IconContainer>
        <CardContent>
          <DetailsContainer>
            <DateTime date={parseISO(incidente.data)} />
            {localidade && (
              <AddressContainer>
                <Address
                  uf={ufLabels[localidade.uf]}
                  municipio={localidade.municipio}
                  descricao={localidade.descricao}
                />
              </AddressContainer>
            )}
            <h3>{incidente.nomeOperacao || 'Operação sem nome'}</h3>
          </DetailsContainer>
        </CardContent>
        {selected && (
          <ButtonBar>
            <IconButton icon={FaTrashAlt} label="Excluir" />
            <IconButton icon={FaPencilAlt} label="Editar" />
            <IconButton icon={FaPaperPlane} label="Navegar" />
            <IconButton icon={MdMoreHoriz} label="Mais" />
          </ButtonBar>
        )}
      </CardContainer>
    );
  }
}

export default IncidenteCard;
