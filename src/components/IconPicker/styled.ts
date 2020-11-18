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
  margin: 8px;
  width: 64px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  align-self: stretch;

  > svg {
    font-size: 24px;
  }

  transition: all 0.2s ease-in-out;
  /* border: solid silver 1px; */
  box-shadow: 2px 2px 12px -4px rgba(0, 0, 0, 0.3);

  ${({ selected }) =>
    selected &&
    `
    background: whitesmoke;
    color: #5C6B73;
    box-shadow: inset 2px 2px 8px -4px rgba(0, 0, 0, 0.3);
    > span {
      color: whitesmoke;
      font-weight: 600;
    }
  `};
`;

export const Label = styled.div`
  margin-top: 8px;
  font-size: 12px;
  text-align: center;
  color: rgba(0, 0, 0, 0.7);
`;

export const Description = styled.div`
  font-size: 10px;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
`;
