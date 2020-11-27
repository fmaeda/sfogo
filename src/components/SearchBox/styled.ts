import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  margin-right: 12px;
  /* border: solid green; */
  /* border-radius: 100px; */
  /* background: white; */
  /* box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); */
  /* border: solid lime; */

  > span {
    margin: 14px 0;
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: stretch;
  /* border: blue solid; */
`;
