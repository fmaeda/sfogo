import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 100%; */
  /* border: solid red; */
  .slick-track {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    /* justify-content: center; */
    flex: 1;
    /* border: solid yellow; */
    /* height: 400px; */
  }
  .slick-slide {
    /* display: flex; */
    /* flex-direction: column; */
    /* align-items: center; */
    /* flex: 1; */
    /* align-self: stretch; */
    /* justify-self: stretch; */
    /* height: 140px; */
    /* border: solid red; */
  }
  div {
    outline: none;
  }
  /* background: blue; */
`;

type CardProps = {
  selected?: boolean;
  flipped?: boolean;
};
export const CardContainer = styled.div<CardProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
  border-radius: 8px;
  color: black;
  align-self: stretch;
  justify-self: stretch;
  transition: all 0.2s ease-in-out;
  min-height: ${({ selected }) => (!!selected ? '36vh' : '25vh')};
  min-height: ${({ flipped }) => (!!flipped ? '70vh' : '36vh')};
  /* width: 80vw; */
  min-width: ${({ flipped }) => (!!flipped ? '90vw' : '80vw')};
  margin: 40px 8px 8px 8px;
  perspective: 1000px;
  /* border: solid blue; */
`;

type FlipProps = {
  flipped?: boolean;
};
export const FlipContainer = styled.div<FlipProps>`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex: 1;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  background: white;
  border-radius: 8px;
  /* margin: 8px; */
  /* overflow: hidden; */
  ${({ flipped }) => flipped && `transform: rotateY(180deg);`}
`;

export const FrontCard = styled.div`
  /* position: absolute; */
  display: flex;
  flex: 1;
  flex-direction: column;
  filter: drop-shadow(0px 0px 0px transparent);
  /* background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.01),
    rgba(255, 255, 255, 0.5)
  ); */
  box-shadow: 0 0px 4px 0px rgba(0, 0, 0, 0.2);
  min-height: 120px;
  border-radius: 8px;
  /* height: 300px; */
  backface-visibility: visible;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  /* transform: rotateY(0deg); */
  /* border: solid red; */
`;

export const BackCard = styled.div`
  transform: rotateY(180deg);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px 12px;
  /* border: solid red; */
  border-radius: 8px;
  /* background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  ); */
  box-shadow: 0 0px 4px 0px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  backface-visibility: visible;
  backface-visibility: hidden;
`;

export const IconContainer = styled.div<CardProps>`
  display: flex;
  position: absolute;
  top: 0;
  left: 50%;
  /* left: 20px; */
  transform: translate(-50%, -60%);
  /* transform: translate(0, -60%); */
  transition: all 0.2s ease-in-out;
  font-size: ${({ selected }) => (!!selected ? '32px' : '20px')};
  background: white;
  padding: 12px;
  border-radius: 50%;
  color: gray;
  background: whitesmoke;
  border: solid white 4px;
  filter: drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.1));
`;

export const IconLabel = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  background: white;
  font-weight: bold;
  /* border: solid white 4px; */
  border-radius: 100px;
  padding: 4px 8px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 32px;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
  padding: 12px;

  > h3 {
    font-weight: 200;
    font-size: 16px;
    text-align: center;
  }
`;

export const ButtonBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  flex-direction: row;
  border-radius: 0 0 8px 8px;
  /* border: solid red; */
  align-self: stretch;
  border-top: 1px solid silver;
  justify-content: space-evenly;
  padding: 0 12px;
`;

export const AddressContainer = styled.div`
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  /* border: solid red; */
  /* margin-left: 80px; */
`;

export const CloseContainer = styled.div`
  display: flex;
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.3);
`;

export const DateContainer = styled.div`
  position: absolute;
  bottom: 50px;
  right: 0;
`;
