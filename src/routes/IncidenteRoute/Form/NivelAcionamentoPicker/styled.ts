import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  > h3 {
    text-align: center;
    font-weight: 200;
    font-size: 24px;
  }
  /* border: solid red; */
`;

export const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`;
