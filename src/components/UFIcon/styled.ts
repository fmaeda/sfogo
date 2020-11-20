import styled from 'styles';

type Props = {
  type: 'square' | 'circle';
};
export const Svg = styled.img<Props>`
  margin: 1px;
  height: auto;
  ${({ type }) =>
    type === 'circle' &&
    `
    width: 36px;
    clip-path: circle();
  `};
  ${({ type }) =>
    type === 'square' &&
    `
    width: 20px;
    height: 16px;
  `};
`;
