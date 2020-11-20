import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 4px;
  border-radius: 8px;
  mask-image: radial-gradient(white, black);
  /* border: solid silver 1px; */
  color: rgba(0, 0, 0, 0.5);
  margin: 4px;

  > svg {
    font-size: 16px;
  }
  > span {
    font-size: 10px;
    margin-top: 2px;
  }
`;
