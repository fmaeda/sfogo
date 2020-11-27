import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  /* border: solid lime; */
`;

export const ResultsContainer = styled.div`
  position: absolute;
  top: 40px;
  left: -20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 4px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  color: gray;
  margin: 4px 12px;
  padding: 4px;
  > span {
    margin: 4px 12px;
    padding: 8px 0;
    border-bottom: 1px solid gray;
  }
`;
