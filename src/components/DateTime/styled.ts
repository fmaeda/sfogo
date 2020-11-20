import styled from 'styles';

export const Container = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: row;
  color: rgba(0, 0, 0, 0.4);

  > span {
    display: flex;
    flex-direction: row;
    margin: 6px;
    font-size: 11px;

    > svg {
      font-size: 14px;
      margin-right: 2px;
    }
  }
`;
