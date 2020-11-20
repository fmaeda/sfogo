import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* border: solid red; */
  .slick-track {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    flex: 1;
  }
  .slick-slide {
    /* display: flex; */
    /* flex-direction: column; */
    /* align-items: center; */
    /* flex: 1; */
    /* align-self: stretch; */
    /* justify-self: stretch; */
    /* height: 140px; */
    /* border: solid blue; */
  }
  div {
    outline: none;
  }
  /* background: blue; */
`;

type CardProps = {
  selected?: boolean;
};
export const CardContainer = styled.div<CardProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
  background: white;
  border-radius: 8px;
  color: black;
  margin: 40px 8px 8px 8px;
  align-self: stretch;
  justify-self: stretch;
  transition: all 0.2s ease-in-out;
  height: ${({ selected }) => (!!selected ? '36vh' : '25vh')};
  width: 80vw;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
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
  display: flex;
  flex-direction: row;
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
  font-size: 20px;
  color: rgba(0, 0, 0, 0.3);
`;
