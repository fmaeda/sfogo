import styled from 'styles';

type ItemProps = {
  selected: boolean;
};
export const Container = styled.div<ItemProps>`
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

export const Label = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
`;

export const Description = styled.div`
  font-size: 10px;
  color: rgba(0, 0, 0, 0.5);
`;
