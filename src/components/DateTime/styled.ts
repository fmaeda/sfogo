import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  color: rgba(0, 0, 0, 0.4);

  > span {
    display: flex;
    flex-direction: row;
    margin: 2px 6px;
    font-size: 11px;

    > svg {
      font-size: 14px;
      margin-right: 2px;
    }
  }
`;
