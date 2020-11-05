import styled from 'styles';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* top: -24px; */
  border-radius: 1000px;
  background-image: -webkit-radial-gradient(
    40% 0,
    farthest-side ellipse,
    #596276 10%,
    #303543
  );
  transition: all 0.2s ease-in-out;
  /* border: solid red; */
  padding: 12px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  :active {
    background-image: -webkit-radial-gradient(
      40% 0,
      farthest-side ellipse,
      #4a5164 10%,
      #596276
    );
  }
`;

export const Glass = styled.div`
  backdrop-filter: blur(3px);
  padding: 6px;
  border-radius: 100px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
`;

export const PlusContainer = styled.div`
  position: absolute;
  font-size: 16px;
  bottom: 12px;
  right: 16px;
  filter: drop-shadow(0px 2px 0px rgba(0, 0, 0, 0.5));
`;
