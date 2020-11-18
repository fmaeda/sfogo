import styled from 'styles';

type Props = {
  color?: string;
  disabled?: boolean;
};
export const Container = styled.div<Props>`
  display: flex;
  flex-direction: row;
  background: ${({ color }) => color ?? 'transparent'};
  box-shadow: 2px 2px 12px -4px rgba(0, 0, 0, 0.3);
  border-radius: 40px;
  position: relative;
  user-select: none;
  transition: all 0.2s ease-in-out;
  /* background-image: -webkit-radial-gradient(
    40% 0,
    farthest-side ellipse,
    #596276 10%,
    #303543
  );
  color: whitesmoke; */

  ${({ disabled }) =>
    !!disabled
      ? `
    opacity: 0.5;
  `
      : `
    :active {
      box-shadow: 2px 2px 8px -4px rgba(0, 0, 0, 0.3);
    }
  `}
`;

export const RippleContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  padding: 8px 20px;
  border-radius: 100px;
  mask-image: radial-gradient(white, black);
`;
