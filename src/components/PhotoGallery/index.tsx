import React from 'react';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { CardContainer, Container } from './styled';

import mockData from './mockData';
import { Imagem } from 'model/imagem';

type Props = {};
type State = {
  currentPage: number;
  showLightbox: boolean;
};

class PhotoGallery extends React.Component<Props, State> {
  state: State = {
    currentPage: 0,
    showLightbox: false,
  };

  sliderRef = React.createRef<Slider>();

  handlePageChange = (currentPage: number): void => {
    this.setState({ currentPage });
  };

  renderCard = (currentPage: number) => (
    imagem: Imagem,
    idx: number,
  ): JSX.Element => {
    // console.log('image', imagem.image);
    return (
      <CardContainer
        key={imagem.id}
        img={imagem.image}
        onClick={() => {
          this.setState({
            currentPage: idx,
            showLightbox: true,
          });
        }}
      >
        <img src={imagem.image} />
      </CardContainer>
    );
  };

  render(): JSX.Element {
    const { currentPage, showLightbox } = this.state;
    const images = mockData.map(({ image }) => image);

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
        {showLightbox && (
          <Lightbox
            mainSrc={images[currentPage]}
            nextSrc={images[(currentPage + 1) % images.length]}
            prevSrc={images[(currentPage + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ showLightbox: false })}
            onMovePrevRequest={() => {
              this.setState({
                currentPage: (currentPage + images.length - 1) % images.length,
              });
            }}
            onMoveNextRequest={() => {
              this.setState({
                currentPage: (currentPage + 1) % images.length,
              });
            }}
          />
        )}
      </Container>
    );
  }
}

export default PhotoGallery;
