import styled from 'styles';
import Color from 'color';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  /* justify-content: center; */
  /* border: solid yellow; */
`;

export const Content = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  align-items: center;
  justify-content: center;
`;

type ItemProps = {
  active?: boolean;
  color: string;
};
export const ItemContainer = styled.div<ItemProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  margin: 8px 0 8px 2px;
  padding: 12px 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: rgba(255, 255, 255, 0.5);
  border-left: 2px solid transparent;
  :hover {
    color: white;
  }

  > svg {
    font-size: 24px;
  }
  ${({ active }) =>
    active
      ? `
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0px 20px 0px rgba(0, 0, 0, 0.2);
    color: white;
    cursor: default;
  `
      : `
    :hover {
      color: whitesmoke;
      > div {
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 4px 0px rgba(255, 255, 255, 0.2);
      }
    }
  `}
`;

export const Spacer = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  width: 70%;
`;

export const SelectedMarker = styled.div<ItemProps>`
  position: absolute;
  top: 0;
  bottom: 0px;
  right: 0;
  width: 2px;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  ${({ active, color }) =>
    active &&
    `
      background: ${Color(color).lighten(0.1).hex()};
      box-shadow: 0 0 4px 0px ${color};
  `};
`;
