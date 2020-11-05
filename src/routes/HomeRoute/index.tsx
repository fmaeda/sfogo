import React from 'react';

import { Container } from './styled';
import { RouteComponentProps } from 'react-router';

import StyledButton from 'components/StyledButton';

type Props = {} & RouteComponentProps;

export default ({ history }: Props) => (
  <Container>
    <StyledButton onClick={() => history.push('/products')} label="Products" />
  </Container>
);
