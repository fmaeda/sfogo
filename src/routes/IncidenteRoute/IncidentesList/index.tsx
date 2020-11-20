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
};

class IncidentesList extends React.Component<Props, State> {
  state: State = {
    currentPage: 0,
  };

  sliderRef = React.createRef<Slider>();

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
      />
    );
  };

  handlePageChange = (currentPage: number): void => {
    this.setState({ currentPage });
  };

  render(): JSX.Element {
    const { incidentes } = this.props;
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
          {incidentes.map(this.renderCard(currentPage))}
        </Slider>
      </Container>
    );
  }
}

export default IncidentesList;
