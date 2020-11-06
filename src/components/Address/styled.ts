import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  /* border: solid red; */
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.07);
  color: tomato;
  font-size: 20px;
  padding: 6px;
  margin: 8px 16px;
  width: 20px;
  height: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  > span {
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
  }
  > div {
    color: rgba(0, 0, 0, 0.8);
    font-size: 14px;
  }
`;
