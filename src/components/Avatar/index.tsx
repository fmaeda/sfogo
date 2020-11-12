import React from 'react';

import { FaUserAlt } from 'react-icons/fa';

import {
  Container,
  Glass,
  AvatarContainer,
  NameContainer,
  DescContainer,
} from './styled';

type Props = {
  name?: string;
  descriptiton?: string;
};

class Avatar extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Container>
        <Glass>
          <AvatarContainer>
            <FaUserAlt />
          </AvatarContainer>
        </Glass>
        <NameContainer>Fabiano S. Maeda</NameContainer>
        <DescContainer>Chefe de Brigada</DescContainer>
      </Container>
    );
  }
}

export default Avatar;
