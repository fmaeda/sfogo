import React from 'react';
import { AiFillFire } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import styled from 'styles';

const Container = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  filter: drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.5));
  /* border: solid red; */
`;

const Outline = styled(AiFillFire)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  color: tomato;
  font-size: 44px;
`;

const Fire = styled(AiFillFire)`
  position: absolute;
  bottom: 4px;
  left: 50%;
  font-size: 28px;
  color: orange;
  transform: translateX(-50%);
`;

const Plus = styled(FaPlus)`
  position: absolute;
  font-size: 16px;
  bottom: 2px;
  right: 2px;
  filter: drop-shadow(0px 2px 0px rgba(0, 0, 0, 0.5));
`;

type Props = {};

class FireIcon extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Container>
        <Outline />
        <Fire />
        <Plus />
      </Container>
    );
  }
}

export default FireIcon;
