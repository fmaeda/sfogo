import styled from 'styles';

type Props = {
  color?: string;
};
export const Container = styled.div<Props>`
  display: flex;
  flex-direction: row;
  background: ${({ color }) => color ?? 'transparent'};
  box-shadow: 2px 2px 12px -4px rgba(0, 0, 0, 0.3);
  border-radius: 100px;
  padding: 8px 20px;
  user-select: none;
  transition: all 0.2s ease-in-out;
  /* background-image: -webkit-radial-gradient(
    40% 0,
    farthest-side ellipse,
    #596276 10%,
    #303543
  );
  color: whitesmoke; */

  :active {
    box-shadow: 2px 2px 8px -4px rgba(0, 0, 0, 0.3);
  }
`;
