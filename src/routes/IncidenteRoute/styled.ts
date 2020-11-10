import styled from 'styles';

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  /* border: solid cyan; */
`;

export const MapContainer = styled.div`
  display: flex;
  flex: 1;
  > div {
    width: 100% !important;
    height: 100% !important;
    /* border-radius: 0 0 12px 12px !important; */
    overflow: hidden !important;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
    /* border: solid red; */
  }
`;

export const FabContainer = styled.span`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 60%;
  bottom: 40px;
  right: 50%;
  transform: translateX(50%);
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.4));
  /* border: solid red; */
`;

export const ActionButtons = styled.span`
  position: absolute;
  right: 12px;
  bottom: 30%;
  display: flex;
  flex-direction: column;
  /* border: solid red; */
  > svg {
    border-radius: 100px;
    padding: 8px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    background: whitesmoke;
    margin: 8px 4px;
    color: rgba(0, 0, 0, 0.75);
  }
`;

export const SearchContainer = styled.span`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 2;
  top: 70px;
  left: 0;
  right: 0;
  /* border: solid red; */
`;

export const MarkerContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border: solid red; */
  transform: translate(-50%, -100%);
  > svg {
    color: tomato;
    font-size: 40px;
    filter: drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.4));
  }
`;

export const HintContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: row;
  background: rgba(255, 255, 255, 0.9);
  color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(3px);
  border-radius: 12px;
  padding: 8px 12px;
  /* max-width: 60%; */
  margin-bottom: 12px;
`;

export const ConfirmContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  > * {
    margin: 0 32px;
  }
`;

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  > h3 {
    text-align: center;
    font-weight: 200;
    font-size: 24px;
  }
`;
