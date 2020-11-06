import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  /* border: solid red; */
`;

type ItemProps = {
  selected: boolean;
};
export const ItemContainer = styled.div<ItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 8px;
  border: solid silver 1px;
  margin: 8px;
  width: 64px;
  cursor: pointer;

  > svg {
    font-size: 24px;
  }

  > span {
    margin-top: 4px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
  }

  transition: all 0.2s ease-in-out;

  ${({ selected }) =>
    selected &&
    `
    background: gray;
    color: whitesmoke;
    > span {
      color: whitesmoke;
      font-weight: 600;
    }
  `};
`;
