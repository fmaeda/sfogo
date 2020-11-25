import React from 'react';
import Slider from 'react-slick';

import { CardContainer, Container } from './styled';

import mockData from './mockData';
import { Imagem } from 'model/imagem';

type Props = {};
type State = {
  currentPage: number;
};

class PhotoGallery extends React.Component<Props, State> {
  state: State = {
    currentPage: 0,
  };

  sliderRef = React.createRef<Slider>();

  handlePageChange = (currentPage: number): void => {
    this.setState({ currentPage });
  };

  renderCard = (currentPage: number) => (imagem: Imagem): JSX.Element => {
    console.log('image', imagem.image);
    return (
      <CardContainer key={imagem.id}>
        <img src={imagem.image} width={80} height={80} />
      </CardContainer>
    );
  };

  render(): JSX.Element {
    const { currentPage } = this.state;

    return (
      <Container>
        <Slider
          ref={this.sliderRef}
          dots
          infinite={false}
          speed={200}
          slidesToShow={1}
          slidesToScroll={1}
          centerMode
          variableWidth
          arrows={false}
          afterChange={this.handlePageChange}
        >
          {mockData.map(this.renderCard(currentPage))}
        </Slider>
      </Container>
    );
  }
}

export default PhotoGallery;
