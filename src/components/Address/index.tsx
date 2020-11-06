import React from 'react';

import { GoLocation } from 'react-icons/go';

import { Container, IconContainer, Content } from './styled';

type Props = {
  uf: string;
  municipio: string;
  descricao: string;
};

class Address extends React.Component<Props> {
  render(): JSX.Element {
    const { uf, municipio, descricao } = this.props;

    return (
      <Container>
        <IconContainer>
          <GoLocation />
        </IconContainer>
        <Content>
          <span>{descricao}</span>
          <div>{`${municipio} - ${uf}`}</div>
        </Content>
      </Container>
    );
  }
}

export default Address;
