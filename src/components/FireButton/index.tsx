import React from 'react';
import FireIcon from 'components/FireIcon';
import { FaPlus } from 'react-icons/fa';

import { Container, Glass, PlusContainer } from './styled';

type Props = {};

class FireButton extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Glass>
        <Container>
          <FireIcon />
          <PlusContainer>
            <FaPlus />
          </PlusContainer>
        </Container>
      </Glass>
    );
  }
}

export default FireButton;
