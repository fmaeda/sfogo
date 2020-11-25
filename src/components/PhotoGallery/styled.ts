import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .slick-track {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    flex: 1;
  }
  div {
    outline: none;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  > img {
    border: solid red;
    /* width: 80px; */
    /* height: 80px; */
  }
`;
