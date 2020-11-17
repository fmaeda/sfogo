import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  flex-direction: column;
  align-self: stretch;
  /* border: solid red; */
  overflow: hidden;
`;

type CollapsedProps = {
  collapsed: boolean;
};
export const ButtonsRow = styled.div<CollapsedProps>`
  display: flex;
  /* position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; */
  flex-direction: row;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  ${({ collapsed }) =>
    collapsed &&
    `
    transform: scale(0.7) translateY(-30%);
  `};
  /* border: solid red; */
`;

export const Input = styled.input<CollapsedProps>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  outline: none;
  border: none;
  border-bottom: solid 1px silver;
  /* border-radius: 100px; */
  padding: 6px;
  width: 240px;
  transition: all 0.2s ease-in-out;
  ${({ collapsed }) =>
    !!collapsed &&
    `
    opacity: 0;
    /* transform: translateY(20px); */
  `};
`;
