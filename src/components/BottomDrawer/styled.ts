import styled from 'styles';

export const Container = styled.span`
  > div {
    position: absolute;
    top: unset;
    bottom: 0;
    height: unset;
    filter: drop-shadow(-2px -2px 2px rgba(0, 0, 0, 0.2));
    max-height: 60%;
  }
  color: rgba(0, 0, 0, 0.7);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50vh;
`;
