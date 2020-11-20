import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  color: rgba(0, 0, 0, 0.4);
  /* border: solid red; */
  margin-left: 12px;
  border-right: 1px solid silver;
`;

export const SelectionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  padding-left: 8px;
  /* margin: 0 8px; */
  /* padding: 4px 0px 4px 4px; */
  /* border: solid red; */
`;

export const ArrowContainer = styled.div`
  display: flex;
  align-self: stretch;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 16px;
  transform: translate(-6px, 4px);
  /* border: solid lime; */
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  transform: translateY(120%);
  /* border: solid blue; */
  background: white;
  border-radius: 4px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
`;

export const Option = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
  > svg {
    font-size: 16px;
    margin-right: 8px;
  }
  > span {
    font-size: 12px;
  }
`;
