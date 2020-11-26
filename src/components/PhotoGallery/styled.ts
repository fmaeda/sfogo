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

type CardProps = {
  img: string;
};
export const CardContainer = styled.div<CardProps>`
  /* background: url(${({ img }) => img}) 50% 50% no-repeat;
  min-width: 100px;
  min-height: 100px; */
  margin: 0 8px;
  > img {
    border-radius: 16px;
    object-fit: cover;
    width: 80px;
    height: 80px;
  }
`;
