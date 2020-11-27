import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  /* align-self: stretch; */
  /* justify-self: stretch; */
  /* border: solid cyan; */
  border-radius: 100px;
  background: white;
  margin: 7px 0;
  > svg {
    font-size: 14px;
    padding: 6px 14px;
    /* border-left: 1px solid lightgray; */
    border-radius: 100px;
    margin-right: 4px;
    color: white;
    background: #454c5d;
    /* box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2); */
  }
`;

export const Input = styled.input`
  flex: 1;
  outline: none;
  border: none;
  padding: 8px 16px;
  background: transparent;
`;
