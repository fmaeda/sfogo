import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background: white;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  > svg {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    padding: 4px 12px;
    border-left: 1px solid lightgray;
  }
`;

export const Input = styled.input`
  flex: 1;
  outline: none;
  border: none;
  padding: 8px 16px;
  background: transparent;
`;

export const ResultsContainer = styled.div`
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
