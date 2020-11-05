import styled from 'styles';

type DrawerProps = {
  drawerOpen: boolean;
};

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  position: relative;
  overflow: hidden;
  /* background-color: yellow; */
  /* margin: 60px 12px 0; */
`;

export const Content = styled.div<DrawerProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  flex: 1;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  ${({ drawerOpen }) => `
    transform: translateX(${drawerOpen ? '60px' : '0px'});
  `}
  perspective: 800px;
`;

export const MapContainer = styled.div<DrawerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  /* border: solid lime; */
  /* border-radius: ${({ drawerOpen }) => (drawerOpen ? '8px' : '0')}; */
  border-radius: 12px;
  /* margin: 8px 14px 14px 8px; */
  margin: 12px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
  /* padding: ${({ drawerOpen }) => (drawerOpen ? '16px' : '12px')}; */
  background: #363b49;

  > div {
    width: 100% !important;
    height: 100% !important;
    border-radius: 0 0 12px 12px !important;
    overflow: hidden !important;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
    /* border: solid red; */
  }
  ${({ drawerOpen }) =>
    drawerOpen &&
    `
    transform: scale(0.8) translate(200px, 0px) rotate3d(0, 1, 0, -25deg);
    box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.2);
  `};
`;

export const TopBar = styled.span`
  z-index: 2;
  /* position: absolute;
  top: -1px;
  left: -1px;
  right: -1px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  align-items: center;
  /* border: solid red; */
  /* margin: 20px; */
  /* background: whitesmoke; */
  /* border-radius: 12px 12px 0 0; */
  /* background: rgba(0, 0, 0, 0.8); */
  /* box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); */
  /* color: #777; */
  background: rgba(0, 0, 0, 0.1);
  /* backdrop-filter: blur(3px); */
  box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.5);
`;

export const Header = styled.span`
  display: flex;
  flex-direction: row;
  width: 200px;
  /* border: solid red; */
  /* align-items: center; */
  justify-content: center;
  margin-top: 20px;
`;

export const ButtonBar = styled.div`
  z-index: 9999;
  display: flex;
  flex-direction: row;
  align-self: stretch;
  /* background: whitesmoke; */
  /* border: red solid; */
  align-items: center;
  justify-content: space-evenly;
  height: 60px;
  filter: drop-shadow(-2px -2px 2px rgba(0, 0, 0, 0.3));

  > svg {
    color: #444;
    font-size: 24px;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

export const SideBar = styled.div<DrawerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
  transition: all 0.2s ease-in-out;

  box-shadow: inset -4px 0px 2px -2px rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(3px);
  /* filter: drop-shadow(-4px 0px 4px rgba(0, 0, 0, 0.3)); */
  ${({ drawerOpen }) => `
    transform: translateX(${drawerOpen ? '0' : '-60px'});
  `}

  > svg {
    font-size: 28px;
    margin: 8px;
    padding: 8px;
  }
`;

export const FabContainer = styled.span`
  position: absolute;
  bottom: 40px;
  right: 50%;
  transform: translateX(50%);
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.4));
`;

export const Logo = styled.img`
  height: 28px;
`;

export const BlurryPanel = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
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
