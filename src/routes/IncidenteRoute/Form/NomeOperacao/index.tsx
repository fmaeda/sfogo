import React from 'react';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import IconPicker from 'components/IconPicker';

import { Container, ButtonsRow, Input } from './styled';
import DrawerCard from 'components/BottomDrawer/DrawerCard';

type Props = {
  value?: string;
  onChange: (value?: string) => void;
};

type State = {
  hasName?: boolean;
};

class NomeOperacao extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasName: props.value === undefined ? undefined : !!props.value,
    };
  }

  handleClick = (hasName: boolean) => (): void => {
    this.setState({ hasName });
    if (hasName === false) {
      const { onChange } = this.props;
      onChange(undefined);
    }
  };

  handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { onChange } = this.props;
    onChange(evt.target.value);
  };

  render(): JSX.Element {
    const { hasName } = this.state;
    const { value } = this.props;

    return (
      <DrawerCard title="A Operação possui nome?">
        <Container>
          <ButtonsRow collapsed={!!hasName}>
            <IconPicker
              icon={FaThumbsDown}
              label="Não"
              onClick={this.handleClick(false)}
              selected={hasName === false}
            />
            <IconPicker
              icon={FaThumbsUp}
              label="Sim"
              onClick={this.handleClick(true)}
              selected={hasName === true}
            />
          </ButtonsRow>
          <Input
            type="text"
            collapsed={!hasName}
            value={value ?? ''}
            onChange={this.handleChange}
          />
        </Container>
      </DrawerCard>
    );
  }
}

export default NomeOperacao;
