import styled from 'styles';

export const Container = styled.span`
  /* z-index: 2; */
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  > svg {
    padding: 12px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;
