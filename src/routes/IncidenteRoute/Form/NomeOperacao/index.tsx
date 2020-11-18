import React from 'react';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import IconPicker from 'components/IconPicker';

import { Container, ButtonsRow, Input } from './styled';
import DrawerCard from 'components/BottomDrawer/DrawerCard';

type Props = {
  nomeOperacao?: string;
  hasNomeOperacao?: boolean;
  onChange: (hasNomeOperacao: boolean, nomeOperacao?: string) => void;
};

class NomeOperacao extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleClick = (hasNomeOperacao: boolean) => (): void => {
    const { onChange, nomeOperacao } = this.props;
    onChange(hasNomeOperacao, !!hasNomeOperacao ? nomeOperacao : undefined);
  };

  handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { onChange } = this.props;
    onChange(true, evt.target.value);
  };

  render(): JSX.Element {
    const { nomeOperacao: value, hasNomeOperacao } = this.props;

    return (
      <DrawerCard title="A Operação possui nome?">
        <Container>
          <ButtonsRow collapsed={!!hasNomeOperacao}>
            <IconPicker
              icon={FaThumbsDown}
              label="Não"
              onClick={this.handleClick(false)}
              selected={hasNomeOperacao === false}
            />
            <IconPicker
              icon={FaThumbsUp}
              label="Sim"
              onClick={this.handleClick(true)}
              selected={hasNomeOperacao === true}
            />
          </ButtonsRow>
          <Input
            type="text"
            placeholder="Nome da Operação..."
            collapsed={!hasNomeOperacao}
            value={value ?? ''}
            disabled={!hasNomeOperacao}
            onChange={this.handleChange}
          />
        </Container>
      </DrawerCard>
    );
  }
}

export default NomeOperacao;
