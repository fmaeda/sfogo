import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  > h3 {
    text-align: center;
    font-weight: 200;
    font-size: 24px;
  }
  /* border: solid lime; */
`;

export const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`;
