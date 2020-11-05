import React from 'react';
import { AiFillFire, AiOutlineFire } from 'react-icons/ai';
import styled from 'styles';

const Container = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
`;

const Outline = styled(AiFillFire)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  color: tomato;
  font-size: 44px;
  filter: drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.5));
`;

const Fire = styled(AiFillFire)`
  position: absolute;
  bottom: 4px;
  left: 50%;
  font-size: 28px;
  color: orange;
  transform: translateX(-50%);
`;

type Props = {};

class FireIcon extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Container>
        <Outline />
        <Fire />
      </Container>
    );
  }
}

export default FireIcon;
