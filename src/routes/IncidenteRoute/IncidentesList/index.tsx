import React from 'react';
import { Incidente } from 'model/incidente';
import Slider from 'react-slick';

import { Container } from './styled';
import IncidenteCard from './IncidenteCard';

type Props = {
  incidentes: Incidente[];
  onClose?: () => void;
};

type State = {
  currentPage: number;
  lockSwipe: boolean;
};

class IncidentesList extends React.Component<Props, State> {
  state: State = {
    currentPage: 0,
    lockSwipe: false,
  };

  sliderRef = React.createRef<Slider>();

  handleToggleDetails = (visible: boolean): void => {
    this.setState({ lockSwipe: visible });
  };

  renderCard = (currentPage: number) => (
    incidente: Incidente,
    pageIndex: number,
  ): JSX.Element => {
    const { onClose } = this.props;

    return (
      <IncidenteCard
        key={`inc_${incidente.id}`}
        incidente={incidente}
        selected={currentPage === pageIndex}
        onCloseClick={onClose}
        onDetailsToggle={this.handleToggleDetails}
      />
    );
  };

  handlePageChange = (currentPage: number): void => {
    this.setState({ currentPage });
  };

  render(): JSX.Element {
    const { incidentes } = this.props;
    const { currentPage, lockSwipe } = this.state;

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
          swipe={!lockSwipe}
          afterChange={this.handlePageChange}
        >
          {incidentes.map(this.renderCard(currentPage))}
        </Slider>
      </Container>
    );
  }
}

export default IncidentesList;
