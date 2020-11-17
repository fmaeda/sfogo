import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* border: solid red; */
  /* height: 200px; */

  margin: 12px 0 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  .slick-track {
    display: flex;
    flex: 1;
    /* border: solid purple; */
  }
  .slick-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    align-self: stretch;
    /* border: solid blue; */
  }
  div {
    outline: none;
  }
  ul {
    /* position: relative; */
    /* border: solid red; */
  }
`;

export const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-evenly;
  margin: 30px 0 12px;
  align-self: stretch;

  /* border: solid red; */
`;
