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
  FrontCard,
  BackCard,
  FlipContainer,
  DateContainer,
} from './styled';
import { Incidente } from 'model/incidente';
import {
  nivelAcionamentoIcons,
  nivelAcionamentoLabels,
} from 'model/nivelAcionamento';

import { FaPaperPlane, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { MdChevronLeft } from 'react-icons/md';
import { MdMoreHoriz, MdClose } from 'react-icons/md';
import IconButton from 'components/IconButton';
import Address from 'components/Address';
import { ufLabels } from 'model/uf';
import DateTime from 'components/DateTime';
import PhotoGallery from 'components/PhotoGallery';

type Props = {
  incidente: Incidente;
  selected?: boolean;
  onCloseClick?: () => void;
};

type State = {
  flipped: boolean;
};

class IncidenteCard extends React.Component<Props, State> {
  state: State = {
    flipped: false,
  };

  render(): JSX.Element {
    const { incidente, selected, onCloseClick } = this.props;
    const { flipped } = this.state;

    const Icon = nivelAcionamentoIcons[incidente.nivelAcionamento];
    const { localidade } = incidente;

    return (
      <CardContainer selected={selected} flipped={flipped}>
        <FlipContainer flipped={flipped}>
          <FrontCard>
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
                <DateContainer>
                  <DateTime date={parseISO(incidente.data)} />
                </DateContainer>
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
            {/* {selected && ( */}
            <ButtonBar>
              <IconButton icon={FaTrashAlt} label="Excluir" />
              <IconButton icon={FaPencilAlt} label="Editar" />
              <IconButton icon={FaPaperPlane} label="Navegar" />
              <IconButton
                icon={MdMoreHoriz}
                label="Mais"
                onClick={() => this.setState({ flipped: true })}
              />
            </ButtonBar>
            {/* )} */}
          </FrontCard>
          <BackCard>
            <CloseContainer>
              <MdChevronLeft
                onClick={() => this.setState({ flipped: false })}
              />
            </CloseContainer>
            {localidade && (
              <AddressContainer>
                <Address
                  uf={ufLabels[localidade.uf]}
                  municipio={localidade.municipio}
                  descricao={localidade.descricao}
                />
              </AddressContainer>
            )}
            <PhotoGallery />
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <ButtonBar>
              <IconButton
                icon={MdChevronLeft}
                label="Voltar"
                onClick={() => this.setState({ flipped: false })}
              />
              {/* <IconButton
                icon={MdMoreHoriz}
                label="Mais"
                onClick={() => this.setState({ flipped: true })}
              /> */}
            </ButtonBar>
          </BackCard>
        </FlipContainer>
      </CardContainer>
    );
  }
}

export default IncidenteCard;
