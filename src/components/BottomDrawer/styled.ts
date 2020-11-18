import styled from 'styles';

export const Container = styled.span`
  > div {
    position: absolute;
    top: unset;
    bottom: 0;
    height: unset;
    filter: drop-shadow(-2px -2px 2px rgba(0, 0, 0, 0.2));
    /* max-height: 60%; */
  }
  color: rgba(0, 0, 0, 0.7);
  /* position: fixed; */
  /* border: solid red; */
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* min-height: 40vh; */
  flex: 1;
  /* border: solid cyan; */
`;

export const CloseContainer = styled.div`
  display: flex;
  position: absolute;
  top: 8px;
  right: 8px;
  /* left: 8px; */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 18px;
  border-radius: 100px;
  padding: 3px 12px;
  background: white;
  /* box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5); */
  color: silver;
  /* border: solid 1px rgba(0, 0, 0, 0.3); */
`;
