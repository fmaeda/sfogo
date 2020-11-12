import styled from 'styles';
import Color from 'color';

export const Container = styled.div`
  /* position: absolute; */
  /* top: 50%; */
  /* left: 20px; */
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  align-self: stretch;
  padding: 20px;
  /* justify-content: flex-start; */
  /* border: solid yellow; */
`;

type ItemProps = {
  active?: boolean;
  color: string;
};
export const ItemContainer = styled.div<ItemProps>`
  /* position: relative; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  align-self: stretch;
  user-select: none;
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: rgba(255, 255, 255, 0.5);
  border-left: 2px solid transparent;
  cursor: pointer;
  :hover {
    color: white;
  }

  > svg {
    font-size: 24px;
  }

  ${({ active }) => active && 'color: white'};
`;
export const ItemLabel = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 300;
  margin-left: 16px;
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  align-items: center;
  /* border: solid red; */
`;

export const Logo = styled.img`
  width: 52px;
  margin: 22px 8px;
`;
