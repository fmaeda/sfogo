import styled from 'styles';
import background from 'resources/svg/bg-pattern.svg';

type DrawerProps = {
  drawerOpen: boolean;
};

export const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: row;
  /* overflow: hidden; */
  /* width: 100vw;
  height: 100vh; */
  /* background-color: yellow; */
  /* margin: 60px 12px 0; */
  background-image: url(${background}),
    -webkit-radial-gradient(60% 0, farthest-side ellipse, #596276 10%, #2d313e);
  background-size: cover;
  background-attachment: fixed, fixed;
  /* border: solid red; */
  color: whitesmoke;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  /* border: solid red 5px; */
  /* z-index: 1; */
`;

export const ContentBackground = styled.div<DrawerProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  flex: 1;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  /* overflow: hidden; */
  transition: all 0.2s ease-in-out;
  ${({ drawerOpen }) => `
    transform: translateX(${drawerOpen ? '220px' : '0px'});
  `}
  perspective: 800px;
  /* border: solid cyan; */
`;

export const Content = styled.div<DrawerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  transition: all 0.2s ease-in-out;
  /* overflow: hidden; */
  border-radius: ${({ drawerOpen }) => (drawerOpen ? '12px' : '0')};
  /* box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5); */
  background: #363b49;

  ${({ drawerOpen }) =>
    drawerOpen &&
    `
    transform: scale(1) translate(-8%, 0px) rotate3d(0, 1, 0, -40deg);
    box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.2);
  `};
`;

export const SideBar = styled.div<DrawerProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  min-width: 240px;
  transition: all 0.2s ease-in-out;

  box-shadow: inset -4px 0px 2px -2px rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.25);
  /* backdrop-filter: blur(3px); */
  /* filter: drop-shadow(-4px 0px 4px rgba(0, 0, 0, 0.3)); */
  ${({ drawerOpen }) => `
    transform: translateX(${drawerOpen ? '0' : '-240px'});
  `}

  > svg {
    font-size: 28px;
    /* margin: 8px; */
    padding: 8px;
  }
  overflow: visible;
  /* border: solid red; */
`;

export const Logo = styled.img`
  margin: 28px 0;
  height: 28px;
`;

export const BlurryPanel = styled.div`
  position: absolute;
  z-index: 9999;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

export const Version = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  color: rgba(255, 255, 255, 0.5);
`;
