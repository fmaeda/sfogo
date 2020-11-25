import styled from 'styles';

export const Container = styled.div`
  position: relative;
  color: red;
  backdrop-filter: blur(8px);
  padding: 4px;
  border-radius: 100px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
`;

export const IconContainer = styled.div`
  /* font-size: 32px;
  color: #444b5c;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -16px 0 0 -21px;
  filter: drop-shadow(2px 2px 1px rgba(255, 255, 255, 0.5)); */
  background-image: -webkit-radial-gradient(
    40% 0,
    farthest-side ellipse,
    #596276 10%,
    #303543
  );
  border-radius: 50%;
  width: 12px;
  height: 12px;
  /* border: solid whitesmoke thin; */
  /* box-shadow: 0 0 8px 0px rgba(68, 75, 92, 0.5); */
`;

export const Pin = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: tomato;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;
  animation-name: bounce;
  animation-fill-mode: both;
  animation-duration: 1s;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.5);
  &:after {
    content: '';
    width: 14px;
    height: 14px;
    margin: 8px 0 0 8px;
    background: #2f2f2f;
    position: absolute;
    border-radius: 50%;
  }

  @keyframes bounce {
    0% {
      opacity: 0;
      transform: translateY(-2000px) rotate(-45deg);
    }
    60% {
      opacity: 1;
      transform: translateY(30px) rotate(-45deg);
    }
    80% {
      transform: translateY(-10px) rotate(-45deg);
    }
    100% {
      transform: translateY(0) rotate(-45deg);
    }
  }
`;

export const Pulse = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  height: 14px;
  width: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  /* margin: 11px 0px 0px -12px; */
  transform: translate(-50%, -50%);
  /* transform: rotateX(55deg); */
  z-index: -2;
  &:after {
    content: '';
    border-radius: 50%;
    height: 40px;
    width: 40px;
    position: absolute;
    /* transform: translate(-50%, -50%); */
    margin: -13px 0 0 -13px;
    animation: pulsate 1.5s ease-out;
    animation-iteration-count: infinite;
    opacity: 0;
    box-shadow: 0 0 1px 2px #89849b;
    animation-delay: 1.1s;
  }

  @keyframes pulsate {
    0% {
      transform: scale(0.1, 0.1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1.2, 1.2);
      opacity: 0;
    }
  }
`;
