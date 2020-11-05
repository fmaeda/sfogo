import styled from 'styles';
import background from 'resources/svg/bg-pattern.svg';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex: 1;
  /* background: #666c72; #252C37 */
  /* background: linear-gradient(to top right, #4e598f, #32313a);
  background: linear-gradient(to bottom, #474959, #333541);
  background: linear-gradient(to top, #52535a, #2d2d31); */

  background-image: url(${background}),
    -webkit-radial-gradient(60% 0, farthest-side ellipse, #596276 10%, #2d313e);
  background-size: cover;
  background-attachment: fixed, fixed;
  /* border: solid red; */
  color: whitesmoke;
`;
