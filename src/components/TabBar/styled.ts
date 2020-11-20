import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-self: stretch;
  justify-content: space-evenly;
  align-items: center;
  /* border: solid red; */
`;

type ItemProps = {
  selected?: boolean;
};
export const ItemContainer = styled.div<ItemProps>`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 14px;
  padding: 8px;
  position: relative;
  margin-bottom: 2px;
  ${({ selected }) =>
    `border-bottom: 1px solid ${!!selected ? 'white' : 'transparent'};`}
`;
