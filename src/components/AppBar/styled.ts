import styled from 'styles';

export const Container = styled.span`
  z-index: 2;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  background: rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  > svg {
    padding: 12px;
  }
`;

type Props = {
  collapsed: boolean;
};
export const Content = styled.div<Props>`
  display: flex;
  flex: ${({ collapsed }) => (collapsed ? 'unset' : 1)};
  flex-direction: row;
  align-items: center;
  /* border: solid red; */
  /* padding: 0 20px; */
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  /* border: solid yellow; */
`;
